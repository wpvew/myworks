const AdminService = require('../services/AdminService');
const response = require('../utils/response');

class AdminController {
  async getAllCompany(req, res) {
    try {
      const company = await AdminService.getAllCompany();
      return res.end(response(company));
    } catch (err) {
      return res.end(response(null, err));
    }
  }
}

module.exports = new AdminController();
