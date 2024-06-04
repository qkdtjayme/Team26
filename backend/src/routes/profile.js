require("dotenv").config();

const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/tokenVerifier.js");
const register = require("../services/register.js");
const ApiError = require("../utils/errors.js");

// Middlewares
router.use(authenticate);

router.get("/", async (req, res) => {
  const { _id, username } = req.body;

  if (process.env.NODE_ENV === "development") {
    console.log("Getting profile for: ", username);
  }

  // Gets profile from the database
  try {
    const profile = await register.getProfile(_id);
    return res.send(profile);
  } catch (err) {
    // Returns a bad request if received an ApiError
    if (err instanceof ApiError) {
      return res.status(err.statusCode).send(err.message);
    }

    return res.status(500).send(err.message);
  }
});

router.post("/create", async (req, res) => {
  const { _id, username, ...profileData } = req.body;

  if (process.env.NODE_ENV === "development") {
    console.log("Creating new profile for user Id:", _id);
  }

  // Registers the profile to the server
  try {
    const profile = await register.createNewProfile(_id, profileData);
    return res.send(profile);
  } catch (err) {
    // Returns a bad request if received an ApiError
    if (err instanceof ApiError) {
      return res.status(err.statusCode).send(err.message);
    }

    return res.status(500).send(err.message);
  }
});

router.post("/update", async (req, res) => {
  const { _id, username, ...newData } = req.body;

  if (process.env.NODE_ENV === "development") {
    console.log("Updating profile for user Id:", _id);
  }

  // Updates the profile from the server
  try {
    const profile = await register.updateProfile(_id, newData);
    return res.send(profile);
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
