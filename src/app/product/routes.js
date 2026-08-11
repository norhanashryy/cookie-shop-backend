const express = require('express');
const router = express.Router();

const productController = require('./controllers/product.controller');

router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.get('/', productController.getAllProducts);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;