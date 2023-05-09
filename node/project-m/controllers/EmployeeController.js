const EmployeeService = require('../services/EmployeeService');
const response = require('../utils/response');

class EmployeeController {
  async register(req, res) {
    try {
      const employee = await EmployeeService.register(req.body);
      return res.end(response(employee));
    } catch (err) {
      return res.end(response(null, err));
    }
  }
  async getEmployeerList(req, res) {
    try {
      const employee = await EmployeeService.getEmployeerList(req.body);
      return res.end(response(employee));
    } catch (err) {
      return res.end(response(null, err));
    }
  }


  async login(req, res) {
    try {
      const employee = await EmployeeService.login(req.body);
      return res.end(response(employee));
    } catch (err) {
      return res.end(response(null, err));
    }
  }

  async auth(req, res) {
    try {
      const employee = await EmployeeService.auth(req.employee.id);
      return res.end(response(employee));
    } catch (err) {
      return res.end(response(null, err));
    }
  }

  async logout(req, res) {
    try {
      const employee = await EmployeeService.logout(req.employee.id);
      return res.end(response(employee));
    } catch (err) {
      return res.end(response(null, err));
    }
  }
}

module.exports = new EmployeeController();
