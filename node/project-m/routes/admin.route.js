const { Router } = require('express');
const AdminController = require('../controllers/AdminController');

const router = Router();

router.get('/companies', AdminController.getAllCompany);

module.exports = router;
