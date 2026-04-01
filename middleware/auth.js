const jwt = require('jsonwebtoken');

/**
 * Express middleware that requires a valid JWT in the Authorization header.
 * Attaches the decoded payload as req.customer.
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.customer = payload; // { customerAccessToken, email, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Helper: extract and verify JWT payload from Authorization header without blocking.
 * Returns the payload or null if missing/invalid.
 */
function getJwtPayload(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

module.exports = { requireAuth, getJwtPayload };
