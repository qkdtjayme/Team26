import React from "react";

import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SignupForm from "../components/forms/SignupForm";

import "./css/Signup.css";
import { SIGNUP_URL } from "../Globals.js";

const Signup = () => {
  const handleSubmit = async (formData) => {
    try {
      // Prepare payload
      const payload = {
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        height: formData.height,
        weight: formData.weight,
        sex: formData.sex,
      };

      // Register user to the server
      const response = await axios.post(SIGNUP_URL, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // Redirect user to login
      if (response.status === 200) {
        alert("Registration successful");
        window.location.href = "/login";
      }
    } catch (err) {
      // ! This is a bandaid error-handling. Should add some prompts
      alert("There has been a problem during registration.");
      console.log(err);
    }
  };

  return (
    <Box className="container signup-container">
      <Typography className="signup-heading">Sign Up</Typography>
      <SignupForm submitCallback={handleSubmit} loginPath="/login" />
    </Box>
  );
};

export default Signup;
