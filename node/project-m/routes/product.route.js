const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

router.post('/list', authMiddleware, ProductController.getProductList);
router.post('/save', authMiddleware, ProductController.createOrUpdateProductItem);
router.post('/info', authMiddleware, ProductController.getProductById);
router.post('/delete', authMiddleware, ProductController.removeProductItem);
router.post('/stock-list', authMiddleware, ProductController.getProductStockList);
router.post('/stock-update', authMiddleware, ProductController.updateProductItemStock);

module.exports = router;
