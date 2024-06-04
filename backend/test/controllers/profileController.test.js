const sinon = require("sinon");
const { expect } = require("chai");

// Module to test
const profileController = require("../../src/controllers/profileController.js");

// Necessary module to stub
const mongoose = require("mongoose");
const Profile = require("../../src/models/Profiles.js");

describe("profile functions", async () => {
  describe("createProfile", () => {
    it("should create a new profile in the database", async () => {
      const userId = "AE692D145CBEC082868DA060";
      const profileData = {
        fullName: "Juan Dela Cruz",
        sex: "Male",
        age: 28,
        weight: 65,
        height: 1.56,
      };

      const expectedResult = {
        userId,
        fullName: "Juan Dela Cruz",
        sex: "Male",
        age: 28,
        weight: 65,
        height: 1.56,
        bmi: () => {
          return this.weight / (this.height * this.height);
        },
      };

      // Stubbing the User.create method
      let createStub = sinon.stub(Profile, "create");
      createStub.resolves(expectedResult);

      const profile = await profileController.createProfile(
        userId,
        profileData
      );

      expect(profile).to.deep.equal(expectedResult);
      expect(
        createStub.calledOnceWith({
          userId,
          ...profileData,
        })
      ).to.be.true;

      // Restores the original function
      createStub.restore();
    });

    it("should throw an error if creation fails", async () => {
      const userId = "AE692D145CBEC082868DA060";
      const profileData = { fullName: "mockProfile" };
      const error = new Error("Error creating profile");

      // Stubbing the User.create method to throw an error
      let createStub = sinon.stub(Profile, "create");
      createStub.rejects(error);

      try {
        await profileController.createProfile(userId, profileData);
        // If createUser didn't throw an error, the test should fail
        expect.fail("Expected an error to be thrown");
      } catch (err) {
        expect(err).to.equal(error);
      }

      // Restoring the stub
      createStub.restore();
    });
  });

  describe("updateProfile", () => {
    it("should update the profile entry in the database", async () => {
      const userId = "AE692D145CBEC082868DA060";
      const profileData = {
        fullName: "John Dela Cruz",
        sex: "Male",
        age: 31,
        weight: 72,
        height: 1.56,
      };
      const expectedResult = {
        userId,
        ...profileData,
        bmi: () => {
          return profileData.weight / (profileData.height * profileData.height);
        },
      };

      // Stubbing the Profile.findOne method
      const findOneStub = sinon
        .stub(Profile, "findOne")
        .resolves(expectedResult);

      const profile = await profileController.updateProfile(
        userId,
        profileData
      );

      expect(profile).to.deep.equal(expectedResult);
      expect(findOneStub.calledOnceWithExactly({ userId })).to.be.true;

      // Restoring the stub
      findOneStub.restore();
    });

    it("should throw an error if update fails", async () => {
      const userId = "AE692D145CBEC082868DA060";
      const profileData = {
        fullName: "Juan Dela Cruz",
      };
      const error = new Error("Error updating the profile entry.");

      // Stubbing the Profile.findOne method to throw an error
      const findOneStub = sinon.stub(Profile, "findOne").rejects(error);

      try {
        await profileController.updateProfile(userId, profileData);
        // If updateProfile didn't throw an error, the test should fail
        expect.fail("Expected an error to be thrown");
      } catch (err) {
        expect(err).to.equal(error);
      }

      // Restoring the stub
      findOneStub.restore();
    });
  });
});
