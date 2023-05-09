const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { CompanyModel, EmployeeModel } = require('../models');
const ApiError = require('../utils/ApiError');

class CompanyService {
  async checkCompany(companyData) {
    Object.entries(companyData).forEach(([key, value]) => {
      if (!value)
        throw new ApiError(401, { field: key, message: ` is required` });
    });

    if(isNaN(+companyData.inn)) throw new ApiError(401, { field: 'inn', message: ` is NaN` });

    const emailRegEx = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if(!emailRegEx.test(companyData.email)) throw new ApiError(401, { field: 'email', message: ` is incorrect` });

    const isCompanyExist = await CompanyModel.findOne({
      where: {
        [Op.or]: [
          { name: companyData.name },
          { inn: companyData.inn },
          { email: companyData.email },
        ],
      },
    }).then((data) => {
      if (data?.dataValues) return { ...data.dataValues, name: data.dataValues.name };
      return null;
    });

    if (isCompanyExist) {
      Object.keys(companyData).forEach((key) => {
        if (isCompanyExist[key] === companyData[key])
          throw new ApiError(401, { field: key, message: ` already exist` });
      });
    }

    return true;
  }

  async create({ companyData, employeeData }) {
    Object.entries(employeeData).forEach(([key, value]) => {
      if (!value) throw new ApiError(401, { field: key, message: ` is required` });
    });

    employeeData.phone = employeeData.phone.replace(/[^0-9\+]/g,'')
    if(employeeData.phone.length !== 12) throw new ApiError(401, { field: 'phone', message: ` is incorrect` });

    return await CompanyModel.create(companyData).then(async (responseCompanyData) => {
      const password = (Math.random() + 1).toString(36).substring(4);
      const employeeCreated = await EmployeeModel.create({
        ...employeeData,
        fio: companyData.fio,
        email: companyData.email,
        password: await bcrypt.hash(password, 10).then((hash) => hash),
        permissions: JSON.stringify({hr: true, logistic: true, warehouse: true, analytic: true, content: true}),
        fk_company_id: responseCompanyData.id,
      });

      return { companyId: responseCompanyData.id, username: employeeCreated.username, password };
    });
  }
}

module.exports = new CompanyService();
