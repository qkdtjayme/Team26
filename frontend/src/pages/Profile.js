import React from "react";

import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { PROFILE_URL } from "../Globals.js";
import "./css/Profile.css";
import NavBar from "../components/new/NavBar.js";

const DISPLAY = [
  "bmi",
  "fullName",
  "height",
  "weight",
  "sex",
  "userId",
  "class",
];

const STRING_EQ = {
  userId: "User ID",
  fullName: "Full Name",
  sex: "Sex",
  weight: "Weight (kg)",
  height: "Height (cm)",
  bmi: "BMI",
  class: "Class",
};

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

// Mock profile data
const mockProfile = {
  fullName: "John Doe",
  sex: "Male",
  height: 180,
  weight: 75,
  bmi: 23,
  class: "Healthy weight",
  userId: "123456",
};

const Profile = () => {
  const [profile, setProfile] = React.useState(mockProfile);
  const [formData, setFormData] = React.useState({
    fullName: "",
    sex: "",
    height: 0,
    weight: 0,
  });

  React.useEffect(() => {
    // This retrieves the profile saved from the memory
    let _profile = JSON.parse(localStorage.getItem("profile"));
    if (_profile && typeof _profile !== "undefined") {
      // Adds the BMI classification of the user
      const bmiClass = evaluateBmi(_profile.bmi);
      _profile["height"] = _profile["height"] * 100.0;
      _profile["class"] = bmiClass;

      // Sets the profile
      setProfile(_profile);

      // Sets the form data
      Object.keys(formData).map((key, index) => {
        if (typeof _profile[key] !== "undefined") {
          return setFormData((prevValue) => ({
            ...prevValue,
            [key]: _profile[key],
          }));
        }

        return null;
      });
    } else {
      alert("No Profile Found!");
    }
  }, []);

  /**
   * This evaluates the BMI of the user.
   * @param {*} bmi
   * @returns
   */
  const evaluateBmi = (bmi) => {
    if (bmi < 18.5) {
      return "Under weight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "Healthy weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
      return "Over weight";
    } else if (bmi >= 30) {
      return "Obese";
    } else {
      return "Healthy weight";
    }
  };

  /**
   * Function to handle input changes
   * @param {*} e
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Function that gets called when "Create Account" is clicked
   * @param {*} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calls the passed callback
    try {
      // Prepare payload
      const payload = {
        fullName: formData.fullName,
        height: formData.height,
        weight: formData.weight,
        sex: formData.sex,
      };

      // Convert height to meters first before sending the data
      payload.height = payload.height / 100.0;

      // Register user to the server
      const tokenType = localStorage.getItem("tokenType");
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(PROFILE_URL + "/update", payload, {
        headers: {
          Accept: "application/json",
          Authorization: `${tokenType} ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // Redirect user to login
      if (response.status === 200) {
        alert("Update successful");
        window.location.href = "/homepage";
      }
    } catch (err) {
      // ! This is a bandaid error-handling. Should add some prompts
      alert("There has been a problem updating your profile.");
      console.log(err);
    }
  };

  /**
   *
   * @param {*}
   * @returns
   */
  const ProfileBlock = ({ label, value }) => {
    return (
      <Box className="profile-block">
        <Typography className="profile-label profile-text">
          {STRING_EQ[label]}:
        </Typography>
        <Typography className="profile-text">{value}</Typography>
      </Box>
    );
  };

  return (
    <Box className="profile-container">
      <NavBar />
      <Box className="profile-info">
        <Typography className="profile-title">My Profile</Typography>
        <Box>
          {profile &&
            Object.keys(profile).map((key, index) => {
              if (DISPLAY.includes(key)) {
                return (
                  <ProfileBlock key={index} label={key} value={profile[key]} />
                );
              }

              return null;
            })}
        </Box>
        <Typography className="profile-title">Update Profile</Typography>
        <Box component="form" className="profile-form" onSubmit={handleSubmit}>
          <TextField
            className="profile-update"
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
          <Button
            className="profile-button"
            variant="contained"
            type="submit"
            fullWidth
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
