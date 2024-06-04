require("dotenv").config();

const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/jwt");

const authenticate = (req, res, next) => {
  // By passes authentication when in development environment
  if (process.env.NODE_ENV === "development") return next();

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).send({ message: "No authorization header found." });
  }

  // Get access token
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "No JWT token found." });
  }

  // Verify token
  try {
    const { _id, username } = verifyToken(token, "access");

    // This stores the user's id and username in the request object.
    req.body._id = _id;
    req.body.username = username;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ message: "JWT token is invalid." });
    } else if (err instanceof jwt.TokenExpiredError) {
      return res.status(403).send({ message: "JWT token is expired." });
    }
  }

  return next();
};

// Export
module.exports = authenticate;
