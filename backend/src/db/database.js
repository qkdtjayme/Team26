require("dotenv").config();

const mongoose = require("mongoose");

/**
 * Connects to the MongoDB database.
 * @param {string} url
 * @param {*} options
 */
const connectDb = async (url, options) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Connecting to the database...", url);
  }

  // Connect to the database
  await mongoose.connect(url, options);

  if (process.env.NODE_ENV === "development") {
    console.log("Connected to the database.");
  }
};

module.exports = connectDb;
