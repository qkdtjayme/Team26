require("dotenv").config();

const express = require("express");
const router = express.Router();

const register = require("../services/register.js");
const ApiError = require("../utils/errors.js");

router.post("", async (req, res) => {
  const { username, password, ...profileData } = req.body;

  if (process.env.NODE_ENV === "development") {
    console.log("Registering new user:", username);
  }

  // Registers the user to the server
  try {
    const user = await register.createNewUser({ username, password });

    // If the user has been registered, create a new profile for the user.
    if (user && profileData) {
      if (process.env.NODE_ENV === "development") {
        console.log("Creating new profile for:", user.username);
      }

      await register.createNewProfile(user._id, profileData);
    }

    return res.send(user);
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
