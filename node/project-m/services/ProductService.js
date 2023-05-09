const { ColorModel, CountryModel, BrandModel } = require('../models/libraries');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');
const objectBlender = require('../utils/objectBlender');
const { ProductModel, StockModel } = require('../models');

const renameCamelCase =
  ({fk_company_id: companyId, offer_id: offerId, fk_category_id: categoryId, price_sale: priceSale, ...rest}) => ({companyId, offerId, categoryId, priceSale, ...rest})

class ProductService {
  barcodeList = [];
  imageList = [];

  async getProductList({ companyId }) {
    const productList = await ProductModel.findAll({where: { fk_company_id: companyId }});

    if(!productList.length) throw new ApiError(401, { field: null, message: 'product list is empty' });
    return productList.map(productItem => renameCamelCase(productItem.dataValues)).map(({id, offerId, name}) => ({
      id,
      offerId,
      name
    }));
  }

  async getProductById({ id }) {
    const productData = await ProductModel.findByPk(id);

    const { characteristics, barcodes, images, stock, ...general } = renameCamelCase(productData.dataValues);
    const specs = JSON.parse(characteristics);

    this.barcodeList = barcodes;
    this.imageList = images;

    return {general, specs, lists: { barcodes, images }}
  }

  async removeProductItem({ id }) {
    await ProductModel.destroy({ where: { id } });
    return this.getProductList();
  }

  async createOrUpdateProductItem({barcodes, images, ...data}) {
    // validation
    Object.entries(data).forEach(([key, value]) => {
      if(!value) throw new ApiError(401, { field: key, message: ` is required` })
    })

    if(!this.barcodeList.length && !barcodes) throw new ApiError(401, { field: 'barcodes', message: 'is required' })
    if(!this.imageList.length && !images) throw new ApiError(401, { field: 'images', message: 'is required' })

    // console.log(data)
    await CountryModel.findOne({where: { name: data.coo }}).then(res => {
      if(!res) throw new ApiError(400, {field: 'coo', message: ` is incorrect`})
    })
    await BrandModel.findOne({where: { name: data.brand }}).then(res => {
      if(!res) throw new ApiError(400, {field: 'brand', message: ` is incorrect`})
    })
    await ColorModel.findOne({where: { name: data.color }}).then(res => {
      if(!res) throw new ApiError(400, {field: 'color', message: ` is incorrect`})
    })

    if(isNaN(+data.price)) throw new ApiError(400, { field: 'price', message: ` is NaN` });
    if(isNaN(+data.priceSale)) throw new ApiError(400, { field: 'priceSale', message: ` is NaN` });
    if(+data.price <= +data.priceSale) throw new ApiError(400, { field: 'priceSale', message: ` must be lower than first price` })
    // ///////////

    const productData = {
      ...data,
      price: +data.price,
      price_sale: +data.priceSale,
      fk_company_id: data.companyId,
      offer_id: data.offerId,
    }

    const checkExistItem = { where: {
      [Op.and]: [
        { offer_id: productData.offer_id },
        { fk_company_id: productData.fk_company_id }
      ]
    }}

    await ProductModel.findOne(checkExistItem).then(async(res) => {
      if(!res) return await ProductModel.create({...productData, barcodes: [barcodes], images: [images]}).then(async(res) => {
        await StockModel.create({stock: 0, fk_product_id: res.dataValues.id})
       })

      const updateProductData = {
        ...productData,
        barcodes: !res.barcodes.includes(barcodes) && barcodes ? [...res.barcodes, barcodes] : res.barcodes,
        images: !res.images.includes(images) && images ? [...res.images, images] : res.images,
      }

      return await ProductModel.update(updateProductData, checkExistItem)
    })



    return true;
  }

  async getProductStockList({ companyId }) {
    const productStockList = await ProductModel.findAll({where: { fk_company_id: companyId }}).then(async(res) => {
      const productIdList = res.map((item) => item.dataValues.id)

      const productStock = await StockModel.findAll({where: { fk_product_id: { [Op.or]: productIdList }}})
        .then(res => res.reduce((newObj, total) => ({
          ...newObj,
          [total.dataValues.fk_product_id]: total.dataValues.stock
        }), {}))

        console.log(productIdList)

      return res.map(({dataValues}) => ({...dataValues, stock: productStock[dataValues.id]}));
    });
    if(!productStockList) throw new ApiError(404, {field: null, message: 'product list is empty'});

    return productStockList.map(({ id, offer_id: offerId, brand, name, color, barcodes, stock }) => ({ id, offerId, brand, name, color, barcodes, stock }))
  }

  async updateProductItemStock({ data }) {
    await StockModel.bulkCreate(data, { updateOnDuplicate: ['stock'] }).then(console.log)



    // const isExistProductItem = await ProductModel.findByPk(id);
    // if(!isExistProductItem) throw new ApiError(404, { field: null, message: "product item don't exist" });
    // await ProductModel.update({ stock: stockQty }, { where: { id } })
    // console.log(data)
    // const test = await ProductModel.findAll({where: { fk_company_id: companyId }})
    // const tableColumns = Object.keys(test[0].dataValues);

    // const asd = data.map(item => ({
    //   ...test[0].dataValues,
    //   ...item
    // }))

    // console.log(asd)

    // const asd = {
    //   id: 1,
    //   brand: 'lolasdoaosda',
    //   name: 'alkwfmalkwfmalwkf',
    //   price: 12314124,
    //   price_sale: 958293,
    //   images: [''],
    //   barcodes: [''],
    //   offer_id: 'fawfaw',
    //   description: 'fawfa',
    //   color: 'fawf',
    //   coo: 'awfaw',
    //   characteristics: 'awfaw',
    //   stock: 0,
    //   fk_category_id: 1,
    //   fk_company_id: 16
    // }

    // await ProductModel.update(data, { fields })

    // await ProductModel.bulkCreate(asd, { fields: tableColumns,  updateOnDuplicate: ['stock'] }).then(console.log)

    return true
  }
}

module.exports = new ProductService();
