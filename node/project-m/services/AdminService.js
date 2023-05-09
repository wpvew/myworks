const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { EmployeeModel, CompanyModel } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config');

class AdminService {
  async getAllCompany() {
    const company = await CompanyModel.findAll();
    if (!company.length) throw new ApiError(404, 'Company list is empty');
    return company;
  }
}

module.exports = new AdminService();
