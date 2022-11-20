const Router = require('express');

const router = new Router();
const subjectRouter = require('./subjects.route');
const supplyBloodRouter = require('./supplyBlood.route');

router.use('/subjects', subjectRouter);
router.use('/supply_blood', supplyBloodRouter);

module.exports = router;
