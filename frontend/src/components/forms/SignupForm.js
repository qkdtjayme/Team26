import React from "react";

// MUI Materials
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// CSS Stylesheet
import "./css/SignupForm.css";

const sexOptions = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const SignupForm = ({ submitCallback, loginPath }) => {
  const [passwordError, setPasswordError] = React.useState("");
  const [formData, setFormData] = React.useState({
    fullName: "",
    sex: "",
    height: 0,
    weight: 0,
    username: "",
    password: "",
    confirmPassword: "",
  });

  /**
   * Function that gets called when "Create Account" is clicked
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the passwords submitted match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Password do not match. Try again.");
      return;
    }

    // Clears error if the passwords match
    setPasswordError("");

    // Convert height to meters first before sending the data
    formData.height = formData.height / 100.0;

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
      className="signup-form"
      component="form"
      onSubmit={handleSubmit}
      autoComplete
      method="POST"
    >
      <TextField
        className="signup-item"
        name="fullName"
        id="full-name"
        label="Full Name"
        variant="filled"
        required
        value={formData.fullName}
        onChange={handleInputChange}
        size="small"
        fullWidth
      />
      <TextField
        className="signup-item"
        name="height"
        id="height"
        label="Height (cm)"
        variant="filled"
        required
        type="number"
        value={formData.height}
        onChange={handleInputChange}
        size="small"
        fullWidth
      />
      <TextField
        className="signup-item"
        name="weight"
        id="weight"
        label="Weight (kg)"
        variant="filled"
        required
        type="number"
        value={formData.weight}
        onChange={handleInputChange}
        size="small"
        fullWidth
      />
      <TextField
        className="signup-item"
        name="sex"
        id="sex"
        label="Sex"
        variant="filled"
        select
        required
        value={formData.sex}
        onChange={handleInputChange}
        size="small"
        fullWidth
      >
        {sexOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className="signup-item"
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
        className="signup-item"
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
      <TextField
        className="signup-item"
        name="confirmPassword"
        id="confirmPassword"
        label="Confirm Password"
        variant="filled"
        required
        type="password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={passwordError ? true : false}
        helperText={passwordError}
        size="small"
        fullWidth
      />
      <Box className="signup-button-container">
        <Typography variant="caption">
          By registering, you agree to our terms and conditions and privacy
          policy.
        </Typography>
        <Button
          className="signup-button"
          variant="contained"
          type="submit"
          fullWidth
        >
          Create Account
        </Button>
        <Typography variant="caption">Already have an account?</Typography>
        <Button
          className="signup-login-button"
          href={loginPath}
          sx={{ textTransform: "none" }}
          disableRipple
        >
          Login here
        </Button>
      </Box>
    </Box>
  );
};

export default SignupForm;
