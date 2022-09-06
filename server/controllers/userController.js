const { User } = require("../models/models");
const ApiError = require("../error/ApiError");

class UserController {
  async registration(req, res) {}

  async login(req, res) {}

  async check(req, res, next) {
    const { id } = req.query;

    if (!id) {
      return next(ApiError.badRequest("NO ID"));
    }
    return res.send(id);
  }
}

module.exports = new UserController();
