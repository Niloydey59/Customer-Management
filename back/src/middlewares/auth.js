const createError = require("http-errors"); // error-handling middleware
const jwt = require("jsonwebtoken");

const { jwtAccessKey, jwtRefreshKey } = require("../secret");

const { createJSONWebToken } = require("../helper/jsonwebtoken");
const { refreshTokenHandler } = require("../services/finditem");

// Update your auth.js middleware
const isLoggedIn = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError(401, "No access token provided");
    }

    // Extract token from header
    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      throw createError(401, "Invalid access token format");
    }

    try {
      // Verify the access token
      const decoded = jwt.verify(accessToken, jwtAccessKey);

      // Set user in request
      req.user = decoded.user;

      // Proceed to the next middleware
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "Token expired");
      }
      throw createError(401, "Invalid token");
    }
  } catch (error) {
    next(error);
  }
};

const isLoggedOut = (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    console.log("User not logged in");
    return next(); // No token, proceed to the next middleware
  }

  return next(createError(400, "User already logged in!"));
};

const isAdmin = (req, res, next) => {
  try {
    //console.log("User Data: ", req.user);
    if (!req.user.isAdmin) {
      throw createError(403, "Access Denied! Admin only.");
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
