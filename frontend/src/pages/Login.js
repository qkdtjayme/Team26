import React from "react";

import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoginForm from "../components/forms/LoginForm";

import "./css/Login.css";
import { LOGIN_URL } from "../Globals.js";

const Login = () => {
  /**
   * Sends a POST request to the backend
   * @param {*} formData
   */
  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Login successful!");

        // The response includes these three objects
        const { accessToken, refreshToken, tokenType } = response.data;

        // Store tokens in local storage
        if (accessToken) localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        if (tokenType) localStorage.setItem("tokenType", tokenType);

        // Redirect the user to homepage
        window.location.href = "/homepage";
      }
    } catch (err) {
      // ! This is a bandaid error-handling. Should add some prompts
      alert("There has been a problem logging in.");
      console.log(err);
    }
  };

  return (
    <Box className="container login-container">
      <Typography className="login-heading">Log In</Typography>
      <LoginForm submitCallback={handleSubmit} registerPath="/signup" />
    </Box>
  );
};

export default Login;
