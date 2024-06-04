require("dotenv").config();

const jwt = require("jsonwebtoken");
const { expect } = require("chai");

// Import necessary modules for testing
const { generateToken, verifyToken } = require("../../src/utils/jwt.js");

describe("testing jwt.js functions", () => {
  let access_token = "";
  let refresh_token = "";

  // Test payload
  const payload = {
    username: "John123",
  };

  it("should generate jsonwebtoken", () => {
    const _access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "24h",
    });
    const _refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    access_token = generateToken(payload, "access");
    refresh_token = generateToken(payload, "refresh");

    // Expected behavior
    expect(access_token).to.equal(_access_token);
    expect(refresh_token).to.equal(_refresh_token);
  });

  it("should verify jsonwebtoken", () => {
    const payload_from_access_token = verifyToken(access_token, "access");
    const payload_from_refresh_token = verifyToken(refresh_token, "refresh");

    // Expected behavior
    expect(payload_from_access_token["username"]).to.equal(payload["username"]);
    expect(payload_from_refresh_token["username"]).to.equal(
      payload["username"]
    );
  });
});
