const sinon = require("sinon");
const { expect } = require("chai");

// Scripts to test
const register = require("../../src/services/register.js");

// Modules to stub
const userController = require("../../src/controllers/userController.js");
const profileController = require("../../src/controllers/profileController.js");
const ApiError = require("../../src/utils/errors.js");

describe("register function", () => {
  let getUserStub, createUserStub, createProfileStub, updateProfileStub;
  beforeEach(() => {
    getUserStub = sinon.stub(userController, "getUser");
    createUserStub = sinon.stub(userController, "createUser");
    createProfileStub = sinon.stub(profileController, "createProfile");
    updateProfileStub = sinon.stub(profileController, "updateProfile");
  });

  afterEach(() => {
    getUserStub.restore();
    createUserStub.restore();
    createProfileStub.restore();
    updateProfileStub.restore();
  });

  describe("creating new user", () => {
    // Test user
    const testUser = {
      username: "newMockUser",
      password: "justanotherpassword",
    };

    it("should register a new user to the database", async () => {
      // Define behavior of stubs
      getUserStub.resolves([]);
      createUserStub.resolves({
        _id: "newMockId",
        username: "newMockUser",
      });

      // Try registering the user
      const registeredUser = await register.createNewUser(testUser);

      expect(registeredUser).to.deep.equal({
        _id: "newMockId",
        username: "newMockUser",
      });
    });

    it("should fail when user is existing", async () => {
      // Define behavior of stubs
      getUserStub.resolves([{ username: "newMockUser" }]);

      // Try registering the user
      try {
        await register.createNewUser(testUser);
        expect.fail("Expected an error to be thrown.");
      } catch (err) {
        expect(err.message).to.be.equal("Username already exists.");
      }
    });
  });

  describe("creating new profile", () => {
    // Test profile
    const userId = "AE692D145CBEC082868DA060";
    const profileData = {
      fullName: "Juan Dela Cruz",
      sex: "Male",
      age: 28,
      weight: 65,
      height: 1.56,
    };
    const bmi = profileData.weight / (profileData.height * profileData.height);

    it("should register a new profile in the database", async () => {
      // Define behavior of stub
      getUserStub.resolves({ userId });
      createProfileStub.resolves({
        userId,
        ...profileData,
        bmi,
      });

      // Test the function
      const profile = await register.createNewProfile(userId, profileData);

      // Expected behavior
      expect(profile).to.be.deep.equal({
        userId,
        ...profileData,
        bmi,
      });
    });

    it("should return an error if user does not exists", async () => {
      // Define stub behavior
      getUserStub.resolves(null);

      // Try creating user
      try {
        await register.createNewProfile(userId, profileData);
        expect.fail("Expected to throw an API Error.");
      } catch (err) {
        expect(err instanceof ApiError).to.be.true;
        expect(err.message).to.be.equal("User ID does not exists.");
      }
    });
  });

  describe("updating profile", () => {
    // Test profile
    const userId = "AE692D145CBEC082868DA060";
    const profileData = {
      fullName: "Juan Dela Cruz",
      sex: "Male",
      age: 28,
      weight: 65,
      height: 1.56,
    };
    const bmi = profileData.weight / (profileData.height * profileData.height);

    it("should update profile with specified data", async () => {
      // Define behavior of stub
      getUserStub.resolves({ userId });
      updateProfileStub.resolves({
        userId,
        fullName: "John Dela Cruz",
        sex: "Male",
        age: 28,
        weight: 65,
        height: 1.56,
        bmi,
      });

      // Update profile
      const profile = await register.updateProfile(userId, {
        fullName: "John Dela Cruz",
      });

      // Expected behaviors
      expect(profile).to.be.deep.equal({
        userId,
        fullName: "John Dela Cruz",
        sex: "Male",
        age: 28,
        weight: 65,
        height: 1.56,
        bmi,
      });
    });
  });
});
