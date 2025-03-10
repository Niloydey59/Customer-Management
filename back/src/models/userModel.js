const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9_]+$/.test(v);
        },
        message: "Please enter a valid username",
      },
    },

    displayName: {
      type: String,
    },

    email: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.−]?\w+)*@\w+([\.−]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },

    password: {
      type: String,
      required: [true, "User password is required"],
      minlength: [6, "Password can not be less than 6 characters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },

    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{11}$/.test(v);
        },
        message: "Please enter a valid phone number",
      },
    },
  },

  { timestamps: true }
);

const User = model("Users", userSchema);

module.exports = User;
