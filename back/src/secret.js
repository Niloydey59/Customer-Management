require("dotenv").config();

const serverPort = process.env.PORT || 3002;

const mongodbURL =
  process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/StackRuet";

const jwtAccessKey = process.env.JWT_ACCESS_KEY || "akshahsxbaysyuxb";
const jwtRefreshKey = process.env.JWT_REFRESH_KEY || "akshahsxbaysyuxbrefresh";

module.exports = {
  serverPort,
  mongodbURL,
  jwtAccessKey,
  jwtRefreshKey,
};
