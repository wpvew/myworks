const ProductService = require('../services/ProductService');
const response = require('../utils/response')
class ProductController {
  async getProductList(req, res) {
    try {
      const productList = await ProductService.getProductList(req.body);
      return res.end(response(productList));
    } catch (err) {
      return res.end(response(null, err));
    }
  }
  async createOrUpdateProductItem(req, res) {
    try {
      const productList = await ProductService.createOrUpdateProductItem(req.body);
      return res.end(response(productList));
    } catch (err) {
      return res.end(response(null, err));
    }
  }
  async getProductById(req, res) {
    try {
      const productData = await ProductService.getProductById(req.body);
      return res.end(response(productData));
    } catch (err) {
      return res.end(response(null, err));
    }
  }
  async removeProductItem(req, res) {
    try {
      const productData = await ProductService.removeProductItem(req.body);
      return res.end(response(productData));
    } catch (err) {
      return res.end(response(null, err));
    }
  }
  async getProductStockList(req, res) {
    try {
      const productData = await ProductService.getProductStockList(req.body);
      return res.end(response(productData));
    } catch (err) {
      return res.end(response(null, err));
    }
  }
  async updateProductItemStock(req, res) {
    try {
      const productData = await ProductService.updateProductItemStock(req.body);
      return res.end(response(productData));
    } catch (err) {
      return res.end(response(null, err));
    }
  }
}

module.exports = new ProductController();
