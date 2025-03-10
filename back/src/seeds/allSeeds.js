const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");
const seedCustomers = require("./customerSeeds");

const runAllSeeds = async () => {
  try {
    console.log("Running all seed operations...");

    // Make sure both modules are imported as functions but not executed yet
    // We'll manually connect and handle the database connection

    // Connect to MongoDB
    await mongoose.connect(mongodbURL);
    console.log("Connected to MongoDB");

    // Run customer seeds
    await seedCustomers();

    console.log("All seed operations completed successfully");
  } catch (error) {
    console.error("Error running seed operations:", error);
  } finally {
    // Close the database connection when done
    mongoose.connection.close();
    process.exit(0);
  }
};

// Run the combined seed function
runAllSeeds();
