const { Router } = require('express');
const EmployeeController = require('../controllers/EmployeeController');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

router.post('/reg', EmployeeController.register);
router.post('/list', EmployeeController.getEmployeerList);
router.post('/login', EmployeeController.login);
router.get('/auth', authMiddleware, EmployeeController.auth);
router.get('/logout', authMiddleware, EmployeeController.logout);

module.exports = router;
