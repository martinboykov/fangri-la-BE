const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_API_VERSION = '2026-01';

module.exports = {
  storeDomain: SHOPIFY_STORE_DOMAIN,
  storefrontApiUrl: `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  adminApiUrl: `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
  adminAccessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '',
};
