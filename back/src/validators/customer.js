const { body } = require("express-validator");
const Customer = require("../models/customerModel");

// Customer creation validator
const validateCustomerCreation = [
  body("CusID")
    .trim()
    .notEmpty()
    .withMessage("Customer ID is required")
    .custom(async (value) => {
      const existingCustomer = await Customer.findOne({ CusID: value });
      if (existingCustomer) {
        throw new Error("Customer ID already exists");
      }
      return true;
    }),

  body("Name")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("Email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("Phone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number should be 10-15 digits"),

  body("CustomerCode")
    .optional({ checkFalsy: true })
    .trim()
    .custom(async (value) => {
      if (value) {
        const existingCustomer = await Customer.findOne({
          CustomerCode: value,
        });
        if (existingCustomer) {
          throw new Error("Customer code already exists");
        }
      }
      return true;
    }),

  body("OpenBalance")
    .optional()
    .isNumeric()
    .withMessage("Open balance must be a number"),

  body("Website")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Please provide a valid website URL"),

  body("Zipcode")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 10 })
    .withMessage("Zip code should not exceed 10 characters"),

  body("ContactEmail")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please provide a valid contact email address"),

  body("ContactPhone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Contact phone should be 10-15 digits"),

  body("ContactMobile")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Contact mobile should be 10-15 digits"),

  body("TDS").optional().isNumeric().withMessage("TDS must be a number"),

  body("VDS").optional().isNumeric().withMessage("VDS must be a number"),

  body("crefitlimit")
    .optional()
    .isNumeric()
    .withMessage("Credit limit must be a number"),

  body("CMdays").optional().isNumeric().withMessage("CM days must be a number"),

  body("DueLimit")
    .optional()
    .isNumeric()
    .withMessage("Due limit must be a number"),

  body("BirthDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Birth date must be a valid date"),

  body("LoyaltyActivationDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Loyalty activation date must be a valid date"),

  body("IsLoyal")
    .optional()
    .isBoolean()
    .withMessage("IsLoyal must be a boolean value"),

  body("autocode")
    .optional()
    .isBoolean()
    .withMessage("Autocode must be a boolean value"),
];

// Customer update validator
const validateCustomerUpdate = [
  body("Name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("Email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("Phone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number should be 10-15 digits"),

  body("CustomerCode").optional({ checkFalsy: true }).trim(),

  body("OpenBalance")
    .optional()
    .isNumeric()
    .withMessage("Open balance must be a number"),

  body("Website")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Please provide a valid website URL"),

  body("Zipcode")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 10 })
    .withMessage("Zip code should not exceed 10 characters"),

  body("ContactEmail")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please provide a valid contact email address"),

  body("ContactPhone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Contact phone should be 10-15 digits"),

  body("ContactMobile")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Contact mobile should be 10-15 digits"),

  body("TDS").optional().isNumeric().withMessage("TDS must be a number"),

  body("VDS").optional().isNumeric().withMessage("VDS must be a number"),

  body("crefitlimit")
    .optional()
    .isNumeric()
    .withMessage("Credit limit must be a number"),

  body("CMdays").optional().isNumeric().withMessage("CM days must be a number"),

  body("DueLimit")
    .optional()
    .isNumeric()
    .withMessage("Due limit must be a number"),

  body("BirthDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Birth date must be a valid date"),

  body("LoyaltyActivationDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Loyalty activation date must be a valid date"),

  body("IsLoyal")
    .optional()
    .isBoolean()
    .withMessage("IsLoyal must be a boolean value"),

  body("autocode")
    .optional()
    .isBoolean()
    .withMessage("Autocode must be a boolean value"),
];

module.exports = {
  validateCustomerCreation,
  validateCustomerUpdate,
};
