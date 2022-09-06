const Router = require("express");
const { body } = require("express-validator");

const UserController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail().withMessage("bad email"),
  body("password")
    .isLength({ min: 6, max: 16 })
    .withMessage("must be at least 6 chars long and less than 16"),
  UserController.registration
);
router.post("/login", UserController.login);
router.get("/check", authMiddleware, UserController.check);

module.exports = router;
