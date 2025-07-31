const express = require('express');
const router = express.Router();
const productBannerController = require('../controllers/productBannerController');

router.get('/', productBannerController.getProducts);
router.get('/featured', productBannerController.getFeaturedProducts);
router.get('/:id', productBannerController.getProductById);
router.post('/', productBannerController.createProduct);
router.put('/:id', productBannerController.updateProduct);
router.delete('/:id', productBannerController.deleteProduct);

module.exports = router;