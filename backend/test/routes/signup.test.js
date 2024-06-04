const express = require("express");
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// Modules to test
const signupRouter = require("../../src/routes/signup.js");

// Modules required for test to work
const register = require("../../src/services/register.js");

const app = express();
app.use(express.json());
app.use("/signup", signupRouter);

describe("test register route", () => {
  // Test user
  const testUser = {
    username: "newMockUser",
    password: "justanotherpassword",
    fullName: "Juan Dela Cruz",
    sex: "Male",
    age: 28,
    weight: 65,
    height: 1.56,
  };

  let createNewUserStub;
  let createNewProfileStub;

  beforeEach(() => {
    createNewUserStub = sinon.stub(register, "createNewUser");
    createNewProfileStub = sinon.stub(register, "createNewProfile");
  });

  afterEach(() => {
    createNewUserStub.restore();
    createNewProfileStub.restore();
  });

  it("should register the user using the /signup route", async () => {
    createNewUserStub.resolves({
      userId: "newMockId",
      username: "newMockUser",
    });
    createNewProfileStub.resolves();

    const response = await request(app)
      .post("/signup")
      .send(testUser)
      .set("Accept", "application/json");

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({
      userId: "newMockId",
      username: "newMockUser",
    });
  });
});
