const express = require("express");
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// Modules to test
const loginRouter = require("../../src/routes/login.js");

// Modules to stub
const auth = require("../../src/services/auth.js");
const User = require("../../src/models/Users.js");

const app = express();
app.use(express.json());
app.use("/login", loginRouter);

describe("test login route", () => {
  let findOneStub;
  let loginStub;

  beforeEach(() => {
    findOneStub = sinon.stub(User, "findOne");
    loginStub = sinon.stub(auth, "login");
  });

  afterEach(() => {
    findOneStub.restore();
    loginStub.restore();
  });

  it("should log in the user using the /login route", async () => {
    const username = "testUser";
    const password = "testPassword";

    // This is the expected token to be received by the user
    const expectedAccessToken = "mockAccessToken";
    const expectedRefreshToken = "mockRefreshToken";

    // Stubbing the login function from auth.js to return the expected token
    findOneStub.resolves({
      userId: "testUserId",
      username: "testUser",
      comparePassword: sinon.stub().yields(null, true),
    });
    loginStub.resolves({
      accessToken: expectedAccessToken,
      refreshToken: expectedRefreshToken,
    });

    // Send test response to the router
    const response = await request(app)
      .post("/login")
      .send({ username, password })
      .set("Accept", "application/json");

    // Expected behavior
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      accessToken: expectedAccessToken,
      refreshToken: expectedRefreshToken,
      tokenType: "Bearer",
    });
  });
});
