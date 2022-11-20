/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
const response = require('../utils/response');
const ApiError = require('../utils/ApiError');
const { SupplyBloodModel } = require('../models/models');
const { MakeSupplyFromData, MakeSupplyFromDataWithError } = require('./utils/MakeSupplyFromData');

class SupplyBlood {
  async getOne(req, res) {
    const id = String(req.body.id);
    try {
      const supplyBlood = await SupplyBloodModel.findAll({ where: { fk_r1022_p00: id } });
      const sortedSupplyBloodById = supplyBlood.sort((a, b) => a.id - b.id);
      return res.end(response(sortedSupplyBloodById));
    } catch (error) {
      return res.end(response(null, error));
    }
  }

  async create(req, res) {
    try {
      const data = req.body instanceof Array
        ? req.body.map((item) => new MakeSupplyFromDataWithError(item).data)
        : [new MakeSupplyFromDataWithError(req.body).data];
      const supplyBlood = await (SupplyBloodModel.bulkCreate(data))
        .catch((error) => {
          throw new ApiError(error.parent.code, error.parent.detail);
        });
      return res.end(response(supplyBlood));
    } catch (error) {
      return res.end(response(null, error));
    }
  }

  async update(req, res) {
    try {
      const data = req.body instanceof Array
        ? req.body.map((item) => ({ id: item.id, ...new MakeSupplyFromDataWithError(item).data }))
        : [{ id: req.body.id, ...new MakeSupplyFromDataWithError(req.body).data }];
      const supplyBlood = await SupplyBloodModel
        .bulkCreate(data, {
          updateOnDuplicate: Object.keys(new MakeSupplyFromData({}).data),
        })
        .catch((error) => {
          throw new ApiError(error.parent.code, error.parent.detail);
        });
      if (!supplyBlood[0]) throw new ApiError(404, 'Element not found');
      return res.end(response(supplyBlood));
    } catch (error) {
      return res.end(response(null, error));
    }
  }

  async delete(req, res) {
    try {
      const supplyBlood = await SupplyBloodModel.destroy({ where: { id: req.body.id } });
      if (!supplyBlood) throw new ApiError(404, 'Element not found');
      return res.end(response(supplyBlood));
    } catch (error) {
      return res.end(response(null, error));
    }
  }

  async getSupplyRow(req, res) {
    res.end(response(new MakeSupplyFromData(req.body).data));
  }
}

module.exports = new SupplyBlood();
