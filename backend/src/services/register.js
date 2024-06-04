require("dotenv").config();

const ApiError = require("../utils/errors.js");
const userController = require("../controllers/userController.js");
const profileController = require("../controllers/profileController.js");

// Function to check if a user exists
const checkIfUserExists = async (filter, many = false) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Checking if user ID exists.");
    console.log("Filter:", { ...filter });
  }

  const user = await userController.getUser({ ...filter }, many);

  if (process.env.NODE_ENV === "development") {
    console.log("Found:", user);
  }

  return user;
};

/**
 * Creates a new user in the database
 * @param {*} userInfo
 * @returns
 */
const createNewUser = async (userInfo) => {
  const { username, password } = userInfo;

  const existingUsers = await checkIfUserExists({ username }, true);
  if (existingUsers && existingUsers.length > 0) {
    if (process.env.NODE_ENV === "development") {
      console.log("Username already exists.");
    }
    throw new ApiError(400, "Username already exists.");
  }

  // Register user to the database
  const user = await userController.createUser({
    username,
    password,
  });

  return { _id: user._id, username: user.username };
};

/**
 * Create a new profile in the database
 * @param {*} _id
 * @param {*} profileData
 * @returns
 */
const createNewProfile = async (_id, profileData) => {
  // Check if _id exists
  const user = await checkIfUserExists({
    _id,
  });

  if (!user) {
    throw new ApiError(404, "User ID does not exists.");
  }

  // Create new profile
  const profile = await profileController.createProfile(user._id, profileData);
  return profile;
};

const updateProfile = async (_id, profileData) => {
  // Checking if user exists
  const user = await checkIfUserExists({
    _id,
  });

  if (!user) {
    throw new ApiError(404, "User ID does not exists.");
  }

  // Update the profile
  const profile = await profileController.updateProfile(user._id, profileData);
  return profile;
};

const getProfile = async (_id) => {
  const user = await checkIfUserExists({
    _id,
  });

  if (!user) {
    throw new ApiError(404, "User ID does not exists.");
  }

  // Update the profile
  const profile = await profileController.getProfile({ userId: user._id });
  return profile;
};

// Export function
module.exports.createNewUser = createNewUser;
module.exports.createNewProfile = createNewProfile;
module.exports.updateProfile = updateProfile;
module.exports.getProfile = getProfile;
