require("dotenv").config();

const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/tokenVerifier.js");
const userController = require("../controllers/userController.js");
const recordController = require("../controllers/recordController.js");
const ApiError = require("../utils/errors.js");

// Applies JWT verifier in this route
router.use(authenticate);

// Function to check if a user exists
const checkIfUserExists = async (filter, many = false) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Checking if user ID exists.");
    console.log("Filter:", { ...filter });
  }

  const user = await userController.getUser({ ...filter }, many);

  if (process.env.NODE_ENV === "development") {
    console.log("Found:", user);
  }

  return user;
};

router.get("/", async (req, res) => {
  try {
    const { _id, username } = req.body;

    // Checks if user exists
    const user = await checkIfUserExists({ _id });
    if (!user) {
      throw new ApiError(404, "User does not exists.");
    }

    // Get records
    const records = await recordController.getRecord(_id);
    return res.send(records);
  } catch (err) {
    // Returns a bad request if received an ApiError
    if (err instanceof ApiError) {
      return res.status(err.statusCode).send(err.message);
    }

    return res.status(500).send(err.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    const { _id, username, ...recordData } = req.body;

    // Checks if user exists
    const user = await checkIfUserExists({ _id });
    if (!user) {
      throw new ApiError(404, "User does not exists.");
    }

    // Create a new record
    const record = await recordController.createRecord(_id, recordData);
    return res.send(record);
  } catch (err) {
    // Returns a bad request if received an ApiError
    if (err instanceof ApiError) {
      return res.status(err.statusCode).send(err.message);
    }

    return res.status(500).send(err.message);
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { _id, username, recordId } = req.body;

    // Checks if user exists
    const user = await checkIfUserExists({ _id });
    if (!user) {
      throw new ApiError(404, "User does not exists.");
    }

    // Create a new record
    const record = await recordController.deleteRecord(_id, recordId);
    return res.send(record);
  } catch (err) {
    // Returns a bad request if received an ApiError
    if (err instanceof ApiError) {
      return res.status(err.statusCode).send(err.message);
    }

    return res.status(500).send(err.message);
  }
});

// Export router
module.exports = router;
