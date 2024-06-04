require("dotenv").config();

// Import custom scripts
const ApiError = require("../utils/errors.js");
const User = require("../models/Users.js");
const { generateToken } = require("../utils/jwt.js");

/**
 * Allows the user to login to the server. This generates both the access and refresh token
 * required for accessing resources.
 * @param {String} username
 * @param {String} password
 * @returns accessToken, refreshToken
 */
const login = async (username, password) => {
  try {
    const user = await User.findOne({ username: username });
    if (!user) throw new ApiError(404, "User not found.");

    // Wrap the password comparison in a promise
    const isMatch = await new Promise((resolve, reject) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err) return reject(err);
        resolve(isMatch);
      });
    });

    if (!isMatch) throw new ApiError(401, "Password does not match.");

    // Prepares payload for generating JsonWebToken
    const payload = {
      _id: user._id,
      username: user.username,
    };

    // Generates a new JsonWebToken
    const accessToken = generateToken(payload, "access");
    const refreshToken = generateToken(payload, "refresh");

    return { accessToken, refreshToken };
  } catch (err) {
    throw err; // Rethrow the error to be caught by the caller
  }
};

// Export functions
module.exports.login = login;
