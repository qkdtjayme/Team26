const Profile = require("../models/Profiles.js");

/**
 * Gets profile from the database
 * @param {*} filter
 * @param {*} many
 * @returns
 */
const getProfile = async (filter, many = false) => {
  try {
    if (many === true) {
      const profiles = await Profile.find(filter);
      return profiles;
    }

    const profile = await Profile.findOne(filter);
    return profile;
  } catch (err) {
    throw err;
  }
};

/**
 * Creates a new user in the database.
 * @param {String} userId
 * @param {*} data
 * @returns
 */
const createProfile = async (_id, data) => {
  try {
    const profile = await Profile.create({
      userId: _id,
      ...data,
    });
    return profile;
  } catch (err) {
    throw err;
  }
};

/**
 * Updates the user entry in the database
 * @param {String} userId
 * @param {*} data
 * @returns
 */
const updateProfile = async (_id, data) => {
  try {
    let profile = await Profile.findOne({ userId: _id });

    if (!profile) {
      // If profile doesn't exist, you may want to handle this case accordingly
      throw new Error("Profile not found");
    }

    // Skips the set and save for unit testing
    if (process.env.NODE_ENV === "development") return profile;

    // Update profile with new data
    profile.set(data);

    // Save the updated profile to trigger the pre('save') middleware
    profile = await profile.save();

    return profile;
  } catch (err) {
    throw err;
  }
};

// Export function
module.exports.getProfile = getProfile;
module.exports.createProfile = createProfile;
module.exports.updateProfile = updateProfile;
