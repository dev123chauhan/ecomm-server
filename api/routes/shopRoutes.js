const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.getAllProducts);
router.get('/search', shopController.searchProducts);
router.get('/:id', shopController.getProductById);
router.post('/', shopController.createProduct);
router.put('/:id', shopController.updateProduct);
router.delete('/:id', shopController.deleteProduct);

module.exports = router;