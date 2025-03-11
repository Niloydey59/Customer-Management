const express = require("express");

const { validateUserLogin } = require("../validators/user");
const { runValidation } = require("../validators/validation");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");
const {
  userLogin,
  userLogout,
  getCurrentUser,
  refreshAccessToken,
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post(
  "/login",
  isLoggedOut,
  validateUserLogin,
  runValidation,
  userLogin
);

authRouter.get("/logout", isLoggedIn, userLogout);

authRouter.get("/current-user", isLoggedIn, getCurrentUser);

authRouter.post("/refresh-token", refreshAccessToken);

module.exports = authRouter;
