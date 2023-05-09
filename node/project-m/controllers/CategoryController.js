const CategoryService = require('../services/CategoryService');
const response = require('../utils/response')

class CategoryController {
  async getCategoryFieldList(req, res) {
    try {
      const categoryFieldList = await CategoryService.getCategoryFieldList(req.body);
      return res.end(response(categoryFieldList));
    } catch (err) {
      return res.end(response(null, err));
    }
  }
}

module.exports = new CategoryController();
