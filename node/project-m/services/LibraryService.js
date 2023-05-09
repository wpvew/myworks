const { CountryModel } = require("../models/libraries");

class LibraryService {
  async getCountryList() {
    return await CountryModel.findAll().then(res => res.map(item => item.name));
  }
}

module.exports = new LibraryService();
