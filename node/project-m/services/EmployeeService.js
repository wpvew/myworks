const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { EmployeeModel } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config');

class EmployeeService {
  async getEmployeerList({companyId}) {
    const employeerList = (await EmployeeModel.findAll({where: {fk_company_id: companyId}})).map(({dataValues: {fio, phone, email}}) => ({fio, phone, email}));
    if(!employeerList.length) throw new ApiError(404, {field: null, message: 'employeers not found'});
    return employeerList;
  }

  async register(data) {
    Object.entries(data).forEach(([key, value]) => {
      if (!value) throw new ApiError(401, { field: key, message: ` is required` });
    });

    const emailRegEx = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if(!emailRegEx.test(data.email)) throw new ApiError(401, { field: 'email', message: ` is incorrect` });

    data.phone = data.phone.replace(/[^0-9\+]/g,'')
    if(data.phone.length !== 12) throw new ApiError(401, { field: 'phone', message: ` is incorrect` });

    const password = (Math.random() + 1).toString(36).substring(4);
    const employee = {
      ...data,
      fk_company_id: data.companyId,
      password: await bcrypt.hash(password, 10).then((hash) => hash),
    };

    const isExistUser = await EmployeeModel.findOne({
      where: { username: employee.username, fk_company_id: employee.fk_company_id },
    });
    if (isExistUser) throw new ApiError(401, { field: 'username', message: ' already exist' });

    console.log(data)

    await EmployeeModel.create(employee);

    return { username: employee.username, password };
  }

  async login({ companyId: fk_company_id, username, password }) {
    if (!username) throw new ApiError(401, { field: 'username', message: 'Username is required' });
    if (!password) throw new ApiError(401, { field: 'password', message: 'Password is required' });
    if (!fk_company_id)
      throw new ApiError(401, { field: 'companyId', message: 'Company ID is required' });

    if(isNaN(+fk_company_id)) throw new ApiError(401, { field: 'companyId', message: 'Company ID is NaN' });

    const employee = await EmployeeModel.findOne({ where: { username, fk_company_id } });
    if (!employee) throw new ApiError(401, { field: 'username', message: 'No such user' });

    const isPassValid = await bcrypt.compare(password, employee.password);
    if (!isPassValid)
      throw new ApiError(401, { field: 'password', message: 'Password is incorrect' });

    const token = jwt.sign({ id: employee.id }, config.secretKey, { expiresIn: '24h' });

    return {
      username: employee.username,
      fio: employee.fio,
      permissions: JSON.parse(employee.permissions),
      companyId: employee.fk_company_id,
      phone: employee.phone,
      token,
    };
  }

  async auth(id) {
    const employee = await EmployeeModel.findOne({ where: { id } });
    if (!employee) throw new ApiError(401, { field: 'username', message: 'No such user' });
    const token = jwt.sign({ id: employee.id }, config.secretKey, { expiresIn: '24h' });
    return {
      username: employee.username,
      fio: employee.fio,
      permissions: JSON.parse(employee.permissions),
      companyId: employee.fk_company_id,
      phone: employee.phone,
      token,
    };
  }

  async logout(id) {
    const employee = await EmployeeModel.findOne({ where: { id } });
    return 'true';
  }
}

module.exports = new EmployeeService();
