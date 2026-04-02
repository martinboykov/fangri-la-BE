const jwt = require('jsonwebtoken');
const { storefrontQuery } = require('../../../utils/shopify-storefront');

// ─────────────────────────────────────────────
// In-memory cart store: email → cartId
// For local/testing purposes. Swap for a real DB in production.
// ─────────────────────────────────────────────
const customerCartStore = new Map();

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

module.exports = { saveCustomerCart, getCustomerCart, getCustomerAddress, saveCustomerAddress };
