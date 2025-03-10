const createError = require("http-errors"); // error-handling middleware
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { findWithId } = require("../services/finditem");

const processRegister = async (req, res, next) => {
  try {
    //get user data from request body
    const { username, email, password } = req.body;

    //check if user already exists
    const userExist = await User.exists({ email: email });
    if (userExist) {
      throw createError(409, "User already exists!Please login.");
    }

    const usernameExist = await User.exists({ username: username });
    if (usernameExist) {
      throw createError(409, "Username already exists!Please try another.");
    }

    //print user data
    console.log("User Data: ", { username, email, password });

    const newUser = new User({
      username,
      email,
      password,
    });
    await User.create(newUser);

    return successResponse(res, {
      statusCode: 200,
      message: "User registered successfully",
      payload: { username, email },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    //get user id from request params
    console.log("Body: ", req.body);
    const userid = req.params.id;
    const options = { password: 0 };
    await findWithId(User, userid, options);

    const updateOptions = { new: true, runValidators: true, context: "query" };

    let updates = {};

    for (let key in req.body) {
      if (["username", "displayName", "phone"].includes(key)) {
        updates[key] = req.body[key];
      }
    }

    if (req.body.username) {
      const usernameExist = await User.exists({ username: req.body.username });
      if (usernameExist) {
        throw createError(409, "Username already exists!Please try another.");
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      updates,
      updateOptions
    ).select("-password");

    if (!updatedUser) throw createError(404, "User not found!");

    return successResponse(res, {
      statusCode: 200,
      message: "User were updated succesfully!",
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    // get user password from request body
    const { oldPassword, newPassword } = req.body;
    const userId = req.params.id;

    const user = await findWithId(User, userId);

    //compare password
    const isPasswordmatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordmatch) {
      throw createError(400, "Old password did not match! Please try again.");
    }

    const updates = { $set: { password: newPassword } };
    const updateOptions = { new: true };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      updateOptions
    ).select("-password");

    if (!updatedUser) throw createError(400, "Password not updated!");

    return successResponse(res, {
      statusCode: 200,
      message: "User password were updated succesfully!",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  processRegister,
  updateUserById,
  updatePassword,
};
