const jwt = require('jsonwebtoken');
const { storefrontQuery } = require('../../../utils/shopify-storefront');

// ─────────────────────────────────────────────
// In-memory cart store: email → cartId
// For local/testing purposes. Swap for a real DB in production.
// ─────────────────────────────────────────────
const customerCartStore = new Map();

// ─────────────────────────────────────────────
// In-memory notification preferences store: email → { email, sms, push }
// ─────────────────────────────────────────────
const customerNotificationsStore = new Map();

/** Extract and verify JWT payload, or return null */
function getPayload(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    return jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
// POST /customer/cart  — save cartId for authenticated customer
// ─────────────────────────────────────────────
const saveCustomerCart = (req, res) => {
  const payload = getPayload(req);
  if (!payload) return res.status(401).json({ error: 'Authentication required' });

  const { cartId } = req.body;
  if (!cartId) return res.status(400).json({ error: 'cartId is required' });

  customerCartStore.set(payload.email, cartId);
  res.json({ success: true });
};

// ─────────────────────────────────────────────
// GET /customer/cart  — retrieve saved cartId for authenticated customer
// ─────────────────────────────────────────────
const getCustomerCart = (req, res) => {
  const payload = getPayload(req);
  if (!payload) return res.status(401).json({ error: 'Authentication required' });

  const cartId = customerCartStore.get(payload.email) || null;
  res.json({ cartId });
};

// ─────────────────────────────────────────────
// GET /customer/address  — fetch default Shopify address for authenticated customer
// ─────────────────────────────────────────────
const getCustomerAddress = async (req, res) => {
  const payload = getPayload(req);
  if (!payload) return res.status(401).json({ error: 'Authentication required' });

  const query = `
    query getDefaultAddress($accessToken: String!) {
      customer(customerAccessToken: $accessToken) {
        defaultAddress {
          id
          firstName
          lastName
          address1
          city
          province
          country
          zip
        }
      }
    }
  `;

  try {
    const data = await storefrontQuery(query, { accessToken: payload.customerAccessToken });
    const address = data?.customer?.defaultAddress ?? null;
    res.json({ address });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch address' });
  }
};

// ─────────────────────────────────────────────
// POST /customer/address  — save address to Shopify and set as default
// ─────────────────────────────────────────────
const saveCustomerAddress = async (req, res) => {
  const payload = getPayload(req);
  if (!payload) return res.status(401).json({ error: 'Authentication required' });

  const { firstName, lastName, address1, city, province, country, zip } = req.body;

  const createMutation = `
    mutation customerAddressCreate($accessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $accessToken, address: $address) {
        customerAddress { id }
        customerUserErrors { message }
      }
    }
  `;

  const setDefaultMutation = `
    mutation customerDefaultAddressUpdate($accessToken: String!, $addressId: ID!) {
      customerDefaultAddressUpdate(customerAccessToken: $accessToken, addressId: $addressId) {
        customer { defaultAddress { id } }
        customerUserErrors { message }
      }
    }
  `;

  try {
    const createData = await storefrontQuery(createMutation, {
      accessToken: payload.customerAccessToken,
      address: { firstName, lastName, address1, city, province, country, zip },
    });

    const errors = createData?.customerAddressCreate?.customerUserErrors;
    if (errors?.length) return res.status(400).json({ error: errors[0].message });

    const addressId = createData?.customerAddressCreate?.customerAddress?.id;
    if (addressId) {
      await storefrontQuery(setDefaultMutation, {
        accessToken: payload.customerAccessToken,
        addressId,
      });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save address' });
  }
};

// ─────────────────────────────────────────────
// GET /customer/orders  — paginated list of customer orders from Shopify
// Query params: first (max 30), after (cursor)
// ─────────────────────────────────────────────
const getCustomerOrders = async (req, res) => {
  const payload = getPayload(req);
  if (!payload) return res.status(401).json({ error: 'Authentication required' });

  const first = Math.min(parseInt(req.query.first) || 30, 30);
  const after = req.query.after || null;

  const query = `
    query getCustomerOrders($accessToken: String!, $first: Int!, $after: String) {
      customer(customerAccessToken: $accessToken) {
        orders(first: $first, after: $after, sortKey: PROCESSED_AT, reverse: true) {
          pageInfo { hasNextPage endCursor }
          edges {
            node {
              id
              name
              orderNumber
              processedAt
              fulfillmentStatus
              totalPrice { amount currencyCode }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      image { url altText }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await storefrontQuery(query, {
      accessToken: payload.customerAccessToken,
      first,
      ...(after ? { after } : {}),
    });
    const orders = data?.customer?.orders ?? { edges: [], pageInfo: { hasNextPage: false, endCursor: null } };
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// ─────────────────────────────────────────────
// GET /customer/orders/:orderNumber  — single order detail
// :orderNumber is the integer order number (e.g. 1013)
// ─────────────────────────────────────────────
const getCustomerOrder = async (req, res) => {
  const payload = getPayload(req);
  if (!payload) return res.status(401).json({ error: 'Authentication required' });

  const orderNumber = req.params.orderNumber;

  const query = `
    query getCustomerOrder($accessToken: String!, $query: String!) {
      customer(customerAccessToken: $accessToken) {
        orders(first: 1, query: $query) {
          edges {
            node {
              id
              name
              orderNumber
              processedAt
              fulfillmentStatus
              totalPrice { amount currencyCode }
              subtotalPrice { amount currencyCode }
              totalShippingPrice { amount currencyCode }
              email
              phone
              shippingAddress { firstName lastName address1 city province country zip }
              billingAddress { firstName lastName address1 city province country zip }
              lineItems(first: 50) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      image { url altText }
                      price { amount currencyCode }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await storefrontQuery(query, {
      accessToken: payload.customerAccessToken,
      query: `name:#${orderNumber}`,
    });
    const edges = data?.customer?.orders?.edges ?? [];
    if (!edges.length) return res.status(404).json({ error: 'Order not found' });
    res.json(edges[0].node);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// ─────────────────────────────────────────────
// GET /customer/notifications  — fetch notification preferences
// ─────────────────────────────────────────────
const getCustomerNotifications = (req, res) => {
  const payload = getPayload(req);
  if (!payload) return res.status(401).json({ error: 'Authentication required' });

  const prefs = customerNotificationsStore.get(payload.email) ?? { email: true, sms: true, push: true };
  res.json(prefs);
};

// ─────────────────────────────────────────────
// POST /customer/notifications  — save notification preferences
// ─────────────────────────────────────────────
const saveCustomerNotifications = (req, res) => {
  const payload = getPayload(req);
  if (!payload) return res.status(401).json({ error: 'Authentication required' });

  const { email, sms, push } = req.body;
  customerNotificationsStore.set(payload.email, {
    email: Boolean(email),
    sms: Boolean(sms),
    push: Boolean(push),
  });
  res.json({ success: true });
};

module.exports = { saveCustomerCart, getCustomerCart, getCustomerAddress, saveCustomerAddress, getCustomerOrders, getCustomerOrder, getCustomerNotifications, saveCustomerNotifications };
