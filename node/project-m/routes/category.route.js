const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

router.post('/fields', authMiddleware, CategoryController.getCategoryFieldList);

module.exports = router;
