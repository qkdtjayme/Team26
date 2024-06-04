import React from "react";

// MUI Materials
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// CSS Stylesheet
import "./css/LoginForm.css";

const LoginForm = ({ submitCallback, registerPath }) => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  /**
   * Function that gets called when "Create Account" is clicked
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Calls the passed callback
    submitCallback(formData);
  };

  /**
   * Function to handle input changes
   * @param {*} e
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      className="login-form"
      component="form"
      onSubmit={handleSubmit}
      autoComplete
      method="POST"
    >
      <TextField
        className="login-item"
        name="username"
        id="username"
        label="Username"
        variant="filled"
        required
        value={formData.username}
        onChange={handleInputChange}
        size="small"
        fullWidth
      />
      <TextField
        className="login-item"
        name="password"
        id="password"
        label="Password"
        variant="filled"
        required
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        size="small"
        fullWidth
      />
      <Box className="login-button-container">
        <Button
          className="login-button"
          variant="contained"
          type="submit"
          fullWidth
        >
          Sign In
        </Button>
        <Typography variant="caption">Don't have an account?</Typography>
        <Button
          className="login-signup-button"
          href={registerPath}
          sx={{ textTransform: "none" }}
          disableRipple
        >
          Register here
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
