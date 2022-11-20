const { Router } = require('express');
const SupplyBloodController = require('../controllers/SupplyBloodController');

const router = Router();

router.post('/get', SupplyBloodController.getOne);
router.post('/create', SupplyBloodController.create);
router.patch('/', SupplyBloodController.update);
router.delete('/', SupplyBloodController.delete);
router.post('/get_row', SupplyBloodController.getSupplyRow);

module.exports = router;
