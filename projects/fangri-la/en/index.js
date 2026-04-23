const express = require('express');

const router = express.Router();
const authController = require('./auth');
const vaultController = require('./vault');
const artistsController = require('./artists');
const cartController = require('./cart');
const customerController = require('./customer');

// ─────────────────────────────────────────────
// Auth routes
// ─────────────────────────────────────────────
router.get('/auth/user-entered/:id', authController.getUserEntered);
router.get('/auth/me', authController.getMe);

router.post('/auth/login', authController.postLogin);
router.post('/auth/register', authController.postRegister);
router.post('/auth/facebook', authController.postFacebookAuth);
router.post('/auth/facebook/register', authController.postFacebookRegister);
router.post('/auth/google', authController.postGoogleAuth);
router.post('/auth/google/register', authController.postGoogleRegister);
router.post('/auth/forgotten-password', authController.postForgottenPassword);
router.post('/auth/consent', authController.postConsent);

router.put('/auth/new-email', authController.putNewEmail);
router.put('/auth/new-password', authController.putNewPassword);
router.put('/auth/profile-data', authController.putProfileData);
router.put('/auth/password', authController.putPassword);

router.delete('/auth/logout', authController.deleteLogout);
router.delete('/auth/delete-profile', authController.deleteProfile);

router.get('/page/:id', authController.getPage);

// ─────────────────────────────────────────────
// Cart routes
// ─────────────────────────────────────────────
router.post('/cart', cartController.createCart);
router.get('/cart/:cartId', cartController.getCart);
router.post('/cart/:cartId/lines', cartController.addLines);
router.put('/cart/:cartId/lines', cartController.updateLines);
router.delete('/cart/:cartId/lines/:lineId', cartController.removeLine);
router.put('/cart/:cartId/buyer', cartController.updateBuyer);
router.get('/cart/:cartId/checkout-url', cartController.getCheckoutUrl);

// ─────────────────────────────────────────────
// Customer routes (cart persistence)
// ─────────────────────────────────────────────
router.post('/customer/cart', customerController.saveCustomerCart);
router.get('/customer/cart', customerController.getCustomerCart);
router.get('/customer/address', customerController.getCustomerAddress);
router.post('/customer/address', customerController.saveCustomerAddress);
router.get('/customer/orders', customerController.getCustomerOrders);
router.get('/customer/orders/:orderNumber', customerController.getCustomerOrder);
router.get('/customer/notifications', customerController.getCustomerNotifications);
router.post('/customer/notifications', customerController.saveCustomerNotifications);

// ─────────────────────────────────────────────
// Existing routes (vault, artists)
// ─────────────────────────────────────────────
router.get('/vault', vaultController.getVaultItems);
router.get('/vault/:id', vaultController.getVaultItem);

router.get('/artists', artistsController.getArtists);
router.get('/artists/:id', artistsController.getArtist);
router.get('/artists/:id/content', artistsController.getContentItems);
router.get('/artists/:id/content/:contentId', artistsController.getContentItemById);
router.get('/artists/:id/content-likes', artistsController.getContentLikes);
router.put('/artists/:id/content/:contentId/likes', artistsController.putIncreaseLikes);
router.put('/artists/:id/social-link/:socialLinkId', artistsController.putUpdateSocialLink);
router.post('/artists/:id/content', artistsController.postContent);
router.post('/artists/:id/content/:contentId', artistsController.putContent);
router.delete('/artists/:id/content/:contentId', artistsController.deleteContent);

module.exports = router;
