const { adminApiUrl, adminAccessToken } = require('../config/shopify');
const { storeDomain } = require('../config/shopify');

const SHOPIFY_API_VERSION = '2026-01';

function requireToken() {
  if (!adminAccessToken) {
    const err = new Error('SHOPIFY_ADMIN_ACCESS_TOKEN is not set in .env');
    err.status = 401;
    throw err;
  }
  return adminAccessToken;
}

/**
 * Execute a Shopify Admin API GraphQL query or mutation.
 * Mirrors the pattern used in fangri-la-marto/backend/src/utils/shopify-admin.ts
 */
async function adminQuery(query, variables = {}) {
  const token = requireToken();

  const response = await fetch(adminApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const err = new Error(`Admin API HTTP error: ${response.status} ${response.statusText}`);
    err.status = response.status;
    throw err;
  }

  const json = await response.json();

  if (json.errors && json.errors.length > 0) {
    const err = new Error(`Admin API error: ${json.errors[0].message}`);
    err.status = 422;
    throw err;
  }

  return json.data;
}

/**
 * Make a Shopify Admin REST API request.
 * Needed for customer creation because the Admin GraphQL API does not
 * support setting a password — that field only exists on the REST API.
 */
async function adminRestRequest(method, path, body) {
  const token = requireToken();

  const url = `https://${storeDomain}/admin/api/${SHOPIFY_API_VERSION}${path}`;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
  };

  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);

  if (!response.ok) {
    const text = await response.text();
    const err = new Error(`Admin REST API error ${response.status}: ${text}`);
    err.status = response.status;
    throw err;
  }

  return response.json();
}

module.exports = { adminQuery, adminRestRequest };
