const createError = require("http-errors"); // error-handling middleware
const bcrypt = require("bcryptjs");

const Customer = require("../models/customerModel");
const { successResponse } = require("./responseController");
const { findWithId } = require("../services/finditem");

const getCustomers = async (req, res, next) => {
  try {
    // Extract query parameters with defaults
    const {
      page = 1,
      limit = 10,
      sort = "Name",
      order = "asc",
      search = "",
      CustomerCode = "",
      Custype = "",
      ZoneID = "",
      AreaID = "",
      SalesPerson = "",
    } = req.query;

    // Build filter object
    const filter = {};

    // General search across multiple fields
    if (search) {
      filter.$or = [
        { Name: { $regex: search, $options: "i" } },
        { Email: { $regex: search, $options: "i" } },
        { Phone: { $regex: search, $options: "i" } },
        { CustomerCode: { $regex: search, $options: "i" } },
      ];
    }

    // Apply specific filters if provided
    if (CustomerCode)
      filter.CustomerCode = { $regex: CustomerCode, $options: "i" };
    if (Custype) filter.Custype = { $regex: Custype, $options: "i" };
    if (ZoneID) filter.ZoneID = { $regex: ZoneID, $options: "i" };
    if (AreaID) filter.AreaID = { $regex: AreaID, $options: "i" };
    if (SalesPerson)
      filter.SalesPerson = { $regex: SalesPerson, $options: "i" };

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Create sort object
    const sortObj = {};
    sortObj[sort] = order === "asc" ? 1 : -1;

    // Execute query with pagination
    const customers = await Customer.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const totalCount = await Customer.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limitNum);

    // Handle case when no customers found
    if (customers.length === 0) {
      // Still return success but with empty array
      return successResponse(res, {
        statusCode: 200,
        message: "No customers found matching the criteria",
        payload: {
          customers: [],
          pagination: {
            total: 0,
            pages: 0,
            page: pageNum,
            limit: limitNum,
            hasNextPage: false,
            hasPrevPage: pageNum > 1,
          },
        },
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Customers fetched successfully",
      payload: {
        customers,
        pagination: {
          total: totalCount,
          pages: totalPages,
          page: pageNum,
          limit: limitNum,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a list of all unique values for each filter field
// This is useful for populating dropdown menus in the frontend
const getFilterOptions = async (req, res, next) => {
  try {
    const filterOptions = {
      CustomerCodes: await Customer.distinct("CustomerCode"),
      Custypes: await Customer.distinct("Custype"),
      ZoneIDs: await Customer.distinct("ZoneID"),
      AreaIDs: await Customer.distinct("AreaID"),
      SalesPersons: await Customer.distinct("SalesPerson"),
    };

    return successResponse(res, {
      statusCode: 200,
      message: "Filter options fetched successfully",
      payload: { filterOptions },
    });
  } catch (error) {
    next(error);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    // Handle auto-generated customer code if needed
    if (req.body.autocode === true) {
      // Generate a unique customer code
      let isUnique = false;
      let attempts = 0;
      const maxAttempts = 10; // Limit number of attempts to prevent infinite loops

      while (!isUnique && attempts < maxAttempts) {
        const prefix = req.body.Custype
          ? req.body.Custype.substring(0, 2).toUpperCase()
          : "CU";
        const randomCode = Math.floor(1000 + Math.random() * 9000); // 4-digit number
        const proposedCode = `${prefix}-${randomCode}`;

        // Check if the code already exists
        const existingCustomer = await Customer.findOne({
          CustomerCode: proposedCode,
        });

        if (!existingCustomer) {
          // Code is unique, we can use it
          req.body.CustomerCode = proposedCode;
          isUnique = true;
        }

        attempts++;
      }

      // If we couldn't generate a unique code after multiple attempts
      if (!isUnique) {
        // Use timestamp to ensure uniqueness
        const timestamp = Date.now().toString().slice(-5);
        const prefix = req.body.Custype
          ? req.body.Custype.substring(0, 2).toUpperCase()
          : "CU";
        req.body.CustomerCode = `${prefix}-${timestamp}`;
      }
    }

    // Add default values if not provided
    if (!req.body.CreateDate) {
      req.body.CreateDate = new Date();
    }

    // Create and save the customer
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();

    return successResponse(res, {
      statusCode: 201,
      message: "Customer created successfully",
      payload: { customer: savedCustomer },
    });
  } catch (error) {
    // Check for specific MongoDB errors
    if (error.name === "MongoServerError" && error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      const errorMessage = `Customer with this ${field} already exists`;

      return next(createError(409, errorMessage));
    }

    // Pass any other errors to the error handler
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;

    // Find the customer first to check if it exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return next(createError(404, "Customer not found"));
    }

    // Check if CustomerCode is being changed and if it already exists
    if (
      req.body.CustomerCode &&
      req.body.CustomerCode !== customer.CustomerCode
    ) {
      const existingCustomer = await Customer.findOne({
        CustomerCode: req.body.CustomerCode,
      });

      if (existingCustomer && existingCustomer._id.toString() !== customerId) {
        return next(createError(409, "Customer code already exists"));
      }

      console.log("existingCustomer", existingCustomer);

      // If code already exists, remove it from the update data
      if (existingCustomer) {
        delete req.body.CustomerCode;
      }
    }

    // Handle auto-generated customer code if needed and requested
    if (req.body.autocode === true && !req.body.CustomerCode) {
      // Generate a unique customer code
      let isUnique = false;
      let attempts = 0;
      const maxAttempts = 10; // Limit number of attempts

      while (!isUnique && attempts < maxAttempts) {
        const prefix = req.body.Custype
          ? req.body.Custype.substring(0, 2).toUpperCase()
          : "CU";
        const randomCode = Math.floor(1000 + Math.random() * 9000);
        const proposedCode = `${prefix}-${randomCode}`;

        // Check if the code already exists
        const existingCustomer = await Customer.findOne({
          CustomerCode: proposedCode,
          _id: { $ne: customerId }, // Don't match the customer we're updating
        });

        if (!existingCustomer) {
          // Code is unique, we can use it
          req.body.CustomerCode = proposedCode;
          isUnique = true;
        }

        attempts++;
      }

      // If we couldn't generate a unique code after multiple attempts
      if (!isUnique) {
        // Use timestamp to ensure uniqueness
        const timestamp = Date.now().toString().slice(-5);
        const prefix = req.body.Custype
          ? req.body.Custype.substring(0, 2).toUpperCase()
          : "CU";
        req.body.CustomerCode = `${prefix}-${timestamp}`;
      }
    }

    // Don't allow changing the CusID as it's a unique identifier
    if (req.body.CusID && req.body.CusID !== customer.CusID) {
      return next(createError(400, "Customer ID cannot be changed"));
    }

    // Update customer with validation for modified fields
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Run mongoose validators
      }
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Customer updated successfully",
      payload: { customer: updatedCustomer },
    });
  } catch (error) {
    // Handle specific errors
    if (error.name === "MongoServerError" && error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      const errorMessage = `Customer with this ${field} already exists`;

      return next(createError(409, errorMessage));
    }

    // Pass any other errors to the error handler
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.id;

    // Find the customer first to check if it exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return next(createError(404, "Customer not found"));
    }

    // Check if this customer can be deleted
    // You might want to add business logic here to prevent deletion if the customer
    // is referenced by other documents like orders, invoices, etc.

    // Delete the customer
    await Customer.findByIdAndDelete(customerId);

    return successResponse(res, {
      statusCode: 200,
      message: "Customer deleted successfully",
      payload: {
        deletedCustomerId: customerId,
        customerName: customer.Name,
      },
    });
  } catch (error) {
    // Pass any errors to the error handler
    next(error);
  }
};

module.exports = {
  getCustomers,
  getFilterOptions,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
