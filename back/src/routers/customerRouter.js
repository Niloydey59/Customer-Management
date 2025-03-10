const express = require("express");

const { validateUserRegistration } = require("../validators/user");
const { runValidation } = require("../validators/validation");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");
const {
  getCustomers,
  getFilterOptions,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
} = require("../controllers/customerController");
const {
  validateCustomerCreation,
  validateCustomerUpdate,
} = require("../validators/customer");

const customerRouter = express.Router();

// /api/customers common path
customerRouter.get("/", isLoggedIn, getCustomers);

customerRouter.get("/detail/:id", isLoggedIn, getCustomerById);

customerRouter.get("/filter-options", isLoggedIn, getFilterOptions);
customerRouter.post(
  "/create",
  isLoggedIn,
  validateCustomerCreation,
  runValidation,
  createCustomer
);

customerRouter.put(
  "/:id",
  isLoggedIn,
  validateCustomerUpdate,
  runValidation,
  updateCustomer
);

customerRouter.delete("/:id", isLoggedIn, deleteCustomer);

module.exports = customerRouter;
