const jwt = require('jsonwebtoken');

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

module.exports = { saveCustomerCart, getCustomerCart };
