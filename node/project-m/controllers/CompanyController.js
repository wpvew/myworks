const CompanyService = require('../services/CompanyService');
const response = require('../utils/response');

class CompanyController {
  async create(req, res) {
    try {
      const company = await CompanyService.create(req.body);
      return res.end(response(company));
    } catch (err) {
      return res.end(response(null, err));
    }
  }

  async checkCompany(req, res) {
    try {
      const company = await CompanyService.checkCompany(req.body);
      return res.end(response(company));
    } catch (err) {
      return res.end(response(null, err));
    }
  }
}

module.exports = new CompanyController();
