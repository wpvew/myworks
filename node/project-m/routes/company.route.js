const { Router } = require('express');
const CompanyController = require('../controllers/CompanyController');

const router = Router();

router.post('/check', CompanyController.checkCompany);
router.post('/create', CompanyController.create);

module.exports = router;
