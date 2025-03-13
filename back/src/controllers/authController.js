const createError = require("http-errors"); // error-handling middleware
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const { successResponse } = require("./responseController");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const { jwtAccessKey, jwtRefreshKey } = require("../secret");

const userLogin = async (req, res, next) => {
  try {
    //console.log("Request Body: ", req.body);
    //email and password from request body
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, "User not found! Please register.");
    }

    //compare password
    const isPasswordmatch = await bcrypt.compare(password, user.password);
    if (!isPasswordmatch) {
      throw createError(400, "Invalid credentials! Please try again.");
    }

    // Create user object without sensitive data for token
    const userForToken = {
      _id: user._id,
      email: user.email,
      username: user.username,
      displayName: user.displayName || user.username,
      phone: user.phone,
    };

    const isMobile = req.headers["x-platform"] === "mobile";
    console.log("Is Mobile: ", isMobile);
    //generate token, cookie
    //create jwt
    const accessToken = createJSONWebToken(
      { user: userForToken },
      jwtAccessKey,
      "1m"
    );
    const refreshToken = createJSONWebToken(
      { user: userForToken },
      jwtRefreshKey,
      "7d"
    );

    // Set refresh token in HTTP-only cookie (for both web and mobile)
    res.cookie("refresh_token", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    //console.log(res);
    console.log(`Login request from ${isMobile ? "mobile" : "web"} client`);

    return successResponse(res, {
      statusCode: 200,
      message: "User logged in successfully!",
      payload: {
        user: userForToken,
        accessToken: accessToken, // Always include accessToken in response for both web and mobile
        ...(isMobile && { refreshToken }), // Include refreshToken in response only for
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    console.log("Refreshing access token...");
    const isMobile = req.headers["x-platform"] === "mobile";
    console.log("Is Mobile: ", isMobile);
    //console.log("Request Body: ", req.body);
    // Get refresh token from cookie
    //console.log("Request Cookies: ", req.cookies);
    let refreshToken;
    if (isMobile) {
      console.log("Mobile Request");
      refreshToken = req.body.refreshToken;
    } else {
      refreshToken = req.cookies.refresh_token;
    }
    //console.log("Refresh Token: ", refreshToken);

    if (!refreshToken) {
      throw createError(401, "Refresh token not found");
    }

    // Verify refresh token
    try {
      const decoded = jwt.verify(refreshToken, jwtRefreshKey);
      const userFromToken = decoded.user;

      // Generate new access token
      const newAccessToken = createJSONWebToken(
        { user: userFromToken },
        jwtAccessKey,
        "1m"
      );

      // Return new access token
      return successResponse(res, {
        statusCode: 200,
        message: "New access token generated successfully",
        payload: {
          accessToken: newAccessToken,
        },
      });
    } catch (error) {
      console.error("Error verifying refresh token:", error);
      throw createError(401, "Invalid or expired refresh token");
    }
  } catch (error) {
    next(error);
  }
};

const userLogout = async (req, res, next) => {
  try {
    //clear cookie
    res.clearCookie("refresh_token");
    //success response
    return successResponse(res, {
      statusCode: 200,
      message: "Users logged out succesfully!",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    //get user from request
    console.log("Request User: ", req.user);
    const user = req.user;
    console.log("User: ", user);
    //console.log("Current User: ", user);
    //remove password from user
    user.password = undefined;

    return successResponse(res, {
      statusCode: 200,
      message: "Current user fetched successfully!",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLogin,
  userLogout,
  getCurrentUser,
  refreshAccessToken,
};
