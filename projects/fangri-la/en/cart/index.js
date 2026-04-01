const jwt = require('jsonwebtoken');
const { storefrontQuery } = require('../../../../utils/shopify-storefront');

// ─────────────────────────────────────────────
// Shared cart fragment
// ─────────────────────────────────────────────
const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount    { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount { amount currencyCode }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product {
                id
                title
                handle
                featuredImage { url altText }
              }
            }
          }
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────
// POST /cart  — create a new cart
// ─────────────────────────────────────────────
const createCart = async (req, res, next) => {
  const mutation = `
    ${CART_FRAGMENT}
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;
  try {
    const data = await storefrontQuery(mutation, { input: req.body || {} });
    res.status(201).json(data.cartCreate.cart);
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// GET /cart/:cartId  — retrieve cart
// ─────────────────────────────────────────────
const getCart = async (req, res, next) => {
  const query = `
    ${CART_FRAGMENT}
    query cart($id: ID!) {
      cart(id: $id) { ...CartFields }
    }
  `;
  try {
    const data = await storefrontQuery(query, { id: req.params.cartId });
    if (!data.cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(data.cart);
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// POST /cart/:cartId/lines  — add items
// ─────────────────────────────────────────────
const addLines = async (req, res, next) => {
  const mutation = `
    ${CART_FRAGMENT}
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;
  try {
    const data = await storefrontQuery(mutation, {
      cartId: req.params.cartId,
      lines: req.body.lines,
    });
    res.json(data.cartLinesAdd.cart);
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// PUT /cart/:cartId/lines  — update quantities
// ─────────────────────────────────────────────
const updateLines = async (req, res, next) => {
  const mutation = `
    ${CART_FRAGMENT}
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;
  try {
    const data = await storefrontQuery(mutation, {
      cartId: req.params.cartId,
      lines: req.body.lines,
    });
    res.json(data.cartLinesUpdate.cart);
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// DELETE /cart/:cartId/lines/:lineId  — remove one item
// ─────────────────────────────────────────────
const removeLine = async (req, res, next) => {
  const mutation = `
    ${CART_FRAGMENT}
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;
  try {
    const data = await storefrontQuery(mutation, {
      cartId: req.params.cartId,
      lineIds: [req.params.lineId],
    });
    res.json(data.cartLinesRemove.cart);
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// PUT /cart/:cartId/buyer  — update buyer identity
// The backend reads the JWT and injects customerAccessToken so the frontend
// never needs to handle the Shopify token directly.
// ─────────────────────────────────────────────
const updateBuyer = async (req, res, next) => {
  const mutation = `
    ${CART_FRAGMENT}
    mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
      cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  // Start with whatever the frontend sent
  const buyerIdentity = { ...(req.body.buyerIdentity || {}) };

  // Inject customerAccessToken from JWT if present and valid
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const payload = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);
      buyerIdentity.customerAccessToken = payload.customerAccessToken;
    } catch {
      // Invalid/expired JWT — proceed without linking customer
    }
  }

  try {
    const data = await storefrontQuery(mutation, {
      cartId: req.params.cartId,
      buyerIdentity,
    });
    res.json(data.cartBuyerIdentityUpdate.cart);
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// GET /cart/:cartId/checkout-url
// ─────────────────────────────────────────────
const getCheckoutUrl = async (req, res, next) => {
  const query = `
    query cartCheckoutUrl($id: ID!) {
      cart(id: $id) { checkoutUrl }
    }
  `;
  try {
    const data = await storefrontQuery(query, { id: req.params.cartId });
    if (!data.cart) return res.status(404).json({ error: 'Cart not found' });
    res.json({ checkoutUrl: data.cart.checkoutUrl });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCart,
  getCart,
  addLines,
  updateLines,
  removeLine,
  updateBuyer,
  getCheckoutUrl,
};
