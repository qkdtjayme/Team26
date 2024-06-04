import axios from "axios";
import { RECORDS_URL } from "../Globals.js";

/**
 * Call this to add new record to the backend database. The response handler
 * is a function that will be called once the response has been received
 * @param {string} exercise
 * @param {number} sets
 * @param {number} reps
 * @param {function} responseHandler
 */
export const addRecordToDb = async (exercise, sets, reps) => {
  try {
    // Get access token first
    const accessToken = localStorage.getItem("accessToken");
    const tokenType = localStorage.getItem("tokenType");

    // Send POST request to the server
    const response = await axios.post(
      `${RECORDS_URL}/create`,
      { exercise, sets, reps },
      {
        headers: {
          Accept: "application/json",
          Authorization: `${tokenType} ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Call this to get the records from the database.
 * @param {*} responseHandler
 * @returns
 */
export const getRecordsFromDb = async () => {
  try {
    // Get access token first
    const accessToken = localStorage.getItem("accessToken");
    const tokenType = localStorage.getItem("tokenType");

    // Send GET request to the server
    const response = await axios.get(RECORDS_URL, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deleteRecordFromDb = async (recordId, responseHandler) => {
  try {
    // Get access token first
    const accessToken = localStorage.getItem("accessToken");
    const tokenType = localStorage.getItem("tokenType");

    // Send POST request to the server
    const response = await axios.post(
      `${RECORDS_URL}/delete`,
      { recordId },
      {
        headers: {
          Accept: "application/json",
          Authorization: `${tokenType} ${accessToken}`,
        },
      }
    );

    return response;
  } catch (err) {
    console.log(err);
  }
};
