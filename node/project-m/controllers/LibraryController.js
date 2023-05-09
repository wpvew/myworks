const LibraryService = require('../services/LibraryService');
const response = require('../utils/response')

class LibraryController {
  async getCountryList (req, res) {
    try {
      const countryList = await LibraryService.getCountryList();
      return res.end(response(countryList));
    } catch (err) {
      return res.end(response(null, err));
    }
  }
}

module.exports = new LibraryController();
