const Record = require("../models/Records.js");
const mongoose = require("mongoose");

/**
 * Gets an existing record from the database
 * @param {*} _id
 * @returns
 */
const getRecord = async (_id) => {
  try {
    const records = Record.find({ userId: _id });
    return records;
  } catch (err) {
    throw err;
  }
};

/**
 * Create a new record to the database.
 * @param {*} _id
 * @param {*} data
 * @returns
 */
const createRecord = async (_id, data) => {
  try {
    const record = await Record.create({ userId: _id, ...data });
    return record;
  } catch (err) {
    throw err;
  }
};

/**
 * Updates an existing record in the database.
 * @param {*} _id
 * @param {*} data
 * @returns
 */
const updateRecord = async (_id, recordId, data) => {
  try {
    let record = await Record.findOne({
      userId: _id,
      _id: mongoose.Types.ObjectId.createFromHexString(recordId),
    });

    if (!record) {
      // If record doesn't exist, you may want to handle this case accordingly
      throw new Error("Record not found");
    }

    // Update record with new data
    record.set(data);

    // Save the updated record to trigger the pre('save') middleware
    record = await record.save();

    return record;
  } catch (err) {
    throw err;
  }
};

/**
 * Deletes a record from the database
 * @param {*} _id
 * @param {*} recordId
 */
const deleteRecord = async (_id, recordId) => {
  try {
    await Record.deleteOne({
      userId: _id,
      _id: mongoose.Types.ObjectId.createFromHexString(recordId),
    });
  } catch (err) {
    throw err;
  }
};

// Export the function
module.exports = {
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
};
