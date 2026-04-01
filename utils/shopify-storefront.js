const { storefrontApiUrl, storefrontAccessToken } = require('../config/shopify');

/**
 * Execute a Shopify Storefront API GraphQL query or mutation.
 * @param {string} query - GraphQL query/mutation string
 * @param {object} variables - Variables for the query
 * @returns {Promise<object>} - The `data` field from the GraphQL response
 */
async function storefrontQuery(query, variables = {}) {
  const response = await fetch(storefrontApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify Storefront API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors[0]?.message || 'Shopify GraphQL error');
  }

  return json.data;
}

module.exports = { storefrontQuery };
