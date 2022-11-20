const { Router } = require('express');
const SubjectsController = require('../controllers/SubjectController');

const router = Router();

router.get('/', SubjectsController.getSubjects);

module.exports = router;
