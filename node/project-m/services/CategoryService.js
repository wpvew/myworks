
const { CategoryModel } = require("../models");

class CategoryService {
  async getCategoryFieldList({ category }) {
    const categoryFiledList = await CategoryModel.findOne({where: { name: category }}).then(res => JSON.parse(res.field_list));

    return categoryFiledList

  //   const smp = JSON.stringify({
  //     model: 'Model',
  //     os: 'OS',
  //     memory: 'Memoty',
  //     ram: 'RAM',
  //     port: 'Port',
  //     displaySize: 'Display size',
  //     simType: 'SIM type',
  //     simQty: 'Sim qty',
  //     coreQty: 'Core qty',
  //     processor: 'Processor',
  //     net: 'Network',
  //     displayType: 'Type display',
  //     cameraMpxMain: 'Camera mpx main',
  //     cameraMpxFront: 'Camera mpx front',
  // })

  //   await CategoryModel.create({name: 'smp', field_list: smp})


  }
}

module.exports = new CategoryService();
