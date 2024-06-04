require("dotenv").config();

const express = require("express");
const router = express.Router();

const auth = require("../services/auth.js");
const ApiError = require("../utils/errors.js");

router.post("", async (req, res) => {
  // Gets the username and password passed by the user
  const { username, password } = req.body;

  try {
    // Logs in the user to the server
    const { accessToken, refreshToken, err } = await auth.login(
      username,
      password
    );
    if (err) throw err;

    // For development only: Display tokens
    if (process.env.NODE_ENV === "development") {
      console.log({ accessToken, refreshToken });
    }

    // Payload to send to client
    const payload = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      tokenType: "Bearer",
    };

    return res.send(payload);
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
