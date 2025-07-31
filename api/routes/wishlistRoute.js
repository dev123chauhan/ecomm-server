const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');  


router.post('/wishlist/toggle', wishlistController.toggleWishlistItem);
router.get('/wishlist/:userId', wishlistController.getWishlist);
router.delete('/wishlist/:userId/:productId', wishlistController.removeItem);

module.exports = router;
