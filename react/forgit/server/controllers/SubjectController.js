/* eslint-disable class-methods-use-this */
const response = require('../utils/response');
const { SubjectModel } = require('../models/models');

class SubjectController {
  async getSubjects(req, res) {
    const subjects = await SubjectModel.findAll({ attributes: ['p00', 'p01'] });
    return res.end(response(subjects));
  }
}

module.exports = new SubjectController();
