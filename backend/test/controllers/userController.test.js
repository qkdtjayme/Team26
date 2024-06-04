const sinon = require("sinon");
const { expect } = require("chai");

// Necessary modules for testing
const userController = require("../../src/controllers/userController.js");

// Modules to stub
const User = require("../../src/models/Users.js");
const mongoose = require("mongoose");

describe("user functions", async () => {
  describe("createUser", () => {
    it("should create a new user in the database", async () => {
      const userData = { username: "testUser", email: "test@example.com" };
      const expectedResult = { _id: "123456" };

      // Stubbing the User.create method
      const createStub = sinon.stub(User, "create").resolves(expectedResult);

      const result = await userController.createUser(userData);

      expect(result._id).to.equal(expectedResult._id);
      expect(createStub.calledOnceWith(userData)).to.be.true;

      // Restoring the stub
      createStub.restore();
    });

    it("should throw an error if creation fails", async () => {
      const userData = { username: "testUser" };
      const error = new Error("Database error");

      // Stubbing the User.create method to throw an error
      const createStub = sinon.stub(User, "create").rejects(error);

      try {
        await userController.createUser(userData);
        // If createUser didn't throw an error, the test should fail
        expect.fail("Expected an error to be thrown");
      } catch (err) {
        expect(err).to.equal(error);
      }

      // Restoring the stub
      createStub.restore();
    });
  });

  describe("updateUser", () => {
    it("should update the user entry in the database", async () => {
      const userId = "AE692D145CBEC082868DA060";
      const userData = {
        username: "updatedUser",
        email: "updated@example.com",
      };
      const expectedResult = { userId, ...userData };

      // Stubbing the User.findOneAndUpdate method
      const findOneAndUpdateStub = sinon
        .stub(User, "findOneAndUpdate")
        .resolves(expectedResult);

      const result = await userController.updateUser(userId, userData);

      expect(result).to.deep.equal(expectedResult);
      expect(findOneAndUpdateStub.called).to.be.true;

      // Restoring the stub
      findOneAndUpdateStub.restore();
    });

    it("should throw an error if update fails", async () => {
      const userId = "AE692D145CBEC082868DA060";
      const userData = {
        username: "updatedUser",
        email: "updated@example.com",
      };
      const error = new Error("Database error");

      // Stubbing the User.findOneAndUpdate method to throw an error
      const findOneAndUpdateStub = sinon
        .stub(User, "findOneAndUpdate")
        .rejects(error);

      try {
        await userController.updateUser(userId, userData);
        // If updateUser didn't throw an error, the test should fail
        expect.fail("Expected an error to be thrown");
      } catch (err) {
        expect(err).to.equal(error);
      }

      // Restoring the stub
      findOneAndUpdateStub.restore();
    });
  });
});
