require("dotenv").config();

const jwt = require("jsonwebtoken");

/**
 * Generate a JsonWebToken that is used for accessing resource-related
 * routes on the server. This serves as the 'identity' of the user. Without this,
 * the user will not be recognized by the server.
 * @param {*} payload
 * @param {String} type
 * @returns
 */
const generateToken = (payload, type = "access") => {
  try {
    switch (type) {
      case "access":
        if (process.env.NODE_ENV === "development") {
          console.log("Generating access token for:", payload);
        }

        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "24h",
        });
      case "refresh":
        if (process.env.NODE_ENV === "development") {
          console.log("Generating refresh token for:", payload);
        }

        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "7d",
        });
      default:
        return null;
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Verifies the JsonWebToken using the provided secret tokens from the
 * dotenv file.
 * @param {*} token
 * @param {String} type
 * @returns
 */
const verifyToken = (token, type = "access") => {
  try {
    switch (type) {
      case "access":
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      case "refresh":
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      default:
        return null;
    }
  } catch (err) {
    throw err;
  }
};

// Export functions
module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
