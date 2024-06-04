const sinon = require("sinon");
const { expect } = require("chai");

// Import necessary modules for testing
const auth = require("../../src/services/auth.js");

// Modules to stub
const User = require("../../src/models/Users.js");

describe("login function", async () => {
  let findOneStub;

  beforeEach(() => {
    findOneStub = sinon.stub(User, "findOne");
  });

  afterEach(() => {
    findOneStub.restore();
  });

  it("should return access and refresh tokens for valid credentials", async () => {
    findOneStub.resolves({
      userId: "mockUserId",
      username: "mockUsername",
      comparePassword: sinon.stub().yields(null, true),
    });

    const tokens = await auth.login("mockUsername", "mockPassword");

    expect(tokens.accessToken).to.exist;
    expect(tokens.refreshToken).to.exist;
  });

  it("should throw an error for non-existing user", async () => {
    findOneStub.resolves(null);

    try {
      await auth.login("nonExistingUsername", "mockPassword");

      // If the above line does not throw an error, the test should fail
      throw new Error("Expected an error to be thrown for non-existing user");
    } catch (error) {
      expect(error.message).to.equal("User not found.");
    }
  });

  it("should throw an error for incorrect password", async () => {
    findOneStub.resolves({
      comparePassword: sinon.stub().yields(null, false),
    });

    try {
      await auth.login("mockUsername", "incorrectPassword");
      // If the above line does not throw an error, the test should fail
      throw new Error("Expected an error to be thrown for incorrect password");
    } catch (error) {
      expect(error.message).to.equal("Password does not match.");
    }
  });
});
