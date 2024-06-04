require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

// Custom js scripts
const connectDb = require("./src/db/database.js");

// Server Plugins
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Server Routes
const loginRoute = require("./src/routes/login.js");
const signupRoute = require("./src/routes/signup.js");
const profileRoute = require("./src/routes/profile.js");
const recordRoute = require("./src/routes/record.js");

// Initiate Express app
const app = express();
const PORT = process.env.SERVER_PORT;

// Enable Plugins
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Allow serve static files
app.use(express.static("public"));

// Setup server routes
app.use("/v1/login", loginRoute);
app.use("/v1/signup", signupRoute);
app.use("/v1/profile", profileRoute);
app.use("/v1/record", recordRoute);

// Respond to non-existing routes
app.all("*", (req, res) => {
  res.sendStatus(404);
});

// Initiate database params
let DB_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/db";

// If for development, start a local MongoDB server
let mongod;
if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "testing"
) {
  // This creates a local MongoDB server
  MongoMemoryServer.create().then((value) => {
    mongod = value;
    DB_URL = mongod.getUri();

    // Run the server
    connectDb(DB_URL)
      .then(() => {
        app.listen(
          PORT,
          console.log(`Server running and listening to port ${PORT}.`)
        );
      })
      .catch(async (reason) => {
        if (process.env.NODE_ENV === "development") {
          console.log(`Failed to connect to db: ${reason}`);
        }

        // Closes all servers
        await mongoose.connection.close();
        process.exit(1);
      });
  });
} else {
  // Run the server
  connectDb(DB_URL)
    .then(() => {
      app.listen(
        PORT,
        console.log(`Server running and listening to port ${PORT}.`)
      );
    })
    .catch(async (reason) => {
      if (process.env.NODE_ENV === "development") {
        console.log(`Failed to connect to db: ${reason}`);
      }

      // Closes all servers
      await mongoose.connection.close();
      process.exit(1);
    });
}

module.exports = app;
