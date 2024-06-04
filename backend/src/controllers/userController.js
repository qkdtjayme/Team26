const User = require("../models/Users.js");

/**
 * Gets user from the database
 * @param {*} filter
 * @param {*} many
 * @returns
 */
const getUser = async (filter, many = false) => {
  try {
    console.log();
    if (many === true) {
      const users = await User.find(filter).exec();
      return users;
    }

    const user = await User.findOne(filter).exec();
    return user;
  } catch (err) {
    throw err;
  }
};

/**
 * Creates a new user in the database.
 * @param {*} data
 * @returns
 */
const createUser = async (data) => {
  try {
    const { _id, username } = await User.create(data);
    return { _id, username };
  } catch (err) {
    throw err;
  }
};

/**
 * Updates the user entry in the database
 * @param {String} _id
 * @param {*} data
 * @returns
 */
const updateUser = async (_id, data) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id },
      { $set: { ...data } },
      {
        new: true,
      }
    );
    return user;
  } catch (err) {
    throw err;
  }
};

// Export function
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
