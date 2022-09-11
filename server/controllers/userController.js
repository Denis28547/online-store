const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const { User, Basket } = require("../models/models");

function generateJwt({ id, email, role }) {
  const token = jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
}
class UserController {
  async registration(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.badRequest({ errors: errors.errors }));
    }

    const { email, password, role } = req.body;

    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return next(
        ApiError.badRequest(`There is already user with email: ${email}`)
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({ email, password: hashPassword, role });
    const basket = await Basket.create({ userId: user.id });

    const token = generateJwt(user);
    return res.json(token);
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.badRequest(`No user with such email ${email}`));
    }

    const comparePassword = bcrypt.compareSync(password, user.password, 5);

    if (!comparePassword) {
      return next(ApiError.badRequest("Wrong password"));
    }

    const token = generateJwt(user);
    return res.json(token);
  }

  async check(req, res) {
    const user = req.user;
    const token = generateJwt(user);
    return res.json(token);
  }
}

module.exports = new UserController();
