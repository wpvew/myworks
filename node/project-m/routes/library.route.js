const { Router } = require('express');
const LibraryController = require('../controllers/LibraryController');

const router = Router();

router.get('/countries', LibraryController.getCountryList);
// router.get('/categories', LibraryController.getCategoryList);
// router.get('/brands', LibraryController.getBrandList);
// router.get('/colors', LibraryController.getColorList);

module.exports = router;
