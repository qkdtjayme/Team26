// Export global variables
const SERVER_URL = "http://127.0.0.1";
const SERVER_PORT = 5000;
module.exports = {
  LOGIN_URL: `${SERVER_URL}:${SERVER_PORT}/v1/login`,
  SIGNUP_URL: `${SERVER_URL}:${SERVER_PORT}/v1/signup`,
  PROFILE_URL: `${SERVER_URL}:${SERVER_PORT}/v1/profile`,
  RECORDS_URL: `${SERVER_URL}:${SERVER_PORT}/v1/record`,
};
