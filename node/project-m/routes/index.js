const Router = require('express');

const router = new Router();
const adminRouter = require('./admin.route');
const authEmployeeRouter = require('./employee.route');
const authCompanyRouter = require('./company.route');
const productRouter = require('./product.route');
const categoryRouter = require('./category.route');
const libraryRouter = require('./library.route');

router.use('/adm', adminRouter);
router.use('/employee', authEmployeeRouter);
router.use('/company', authCompanyRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/library', libraryRouter);

module.exports = router;
