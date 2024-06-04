const express = require("express");
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// Modules to test
const profileRouter = require("../../src/routes/profile.js");

// Modules required for test to work
const register = require("../../src/services/register.js");

const app = express();
app.use(express.json());
app.use("/profile", profileRouter);

describe("test profile route", () => {
  // Test profile
  const userId = "mockUserId";
  const profileData = {
    fullName: "Juan Dela Cruz",
    sex: "Male",
    age: 28,
    weight: 65,
    height: 1.56,
  };
  const bmi = profileData.weight / (profileData.height * profileData.height);

  let createNewProfileStub, updateProfileStub;
  beforeEach(() => {
    createNewProfileStub = sinon.stub(register, "createNewProfile");
    updateProfileStub = sinon.stub(register, "updateProfile");
  });

  afterEach(() => {
    createNewProfileStub.restore();
    updateProfileStub.restore();
  });

  it("should create new profile for the user using the /profile/create route", async () => {
    createNewProfileStub.resolves({
      userId,
      ...profileData,
      bmi,
    });

    const response = await request(app)
      .post("/profile/create")
      .send({ userId, ...profileData })
      .set("Accept", "application/json");

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({
      userId,
      ...profileData,
      bmi,
    });
  });

  it("should update new profile for the user using /profile/update route", async () => {
    let newFullName = "John Dela Cruz";
    const newProfileData = { ...profileData, fullName: newFullName };

    // Define stub behavior
    updateProfileStub.resolves({
      userId,
      ...newProfileData,
      bmi,
    });

    const response = await request(app)
      .post("/profile/update")
      .send({ userId, fullName: newFullName })
      .set("Accept", "application/json");

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({
      userId,
      ...newProfileData,
      bmi,
    });
  });
});
