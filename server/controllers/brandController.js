const ApiError = require("../error/ApiError");

const { Brand } = require("../models/models");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    const allBrand = await Brand.findAll();
    return res.json(allBrand);
  }
}

module.exports = new BrandController();
