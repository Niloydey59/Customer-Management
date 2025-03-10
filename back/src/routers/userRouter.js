const express = require("express");
const {
  processRegister,
  updateUserById,
  updatePassword,
} = require("../controllers/userController");

const userRouter = express.Router();

const { validateUserRegistration } = require("../validators/user");
const { runValidation } = require("../validators/validation");
const { isLoggedOut } = require("../middlewares/auth");

// /api/users common path
userRouter.post(
  "/register",
  isLoggedOut,
  validateUserRegistration,
  runValidation,
  processRegister
); // Register user

userRouter.put("/update-profile/:id", updateUserById); // Update user by id

userRouter.put("/update-password/:id", updatePassword); // Update password by id

module.exports = userRouter;
