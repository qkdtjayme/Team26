import React from "react";

import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { PROFILE_URL } from "../Globals.js";
import { EXERCISES, EXERCISES_PER_TYPE } from "./data/exerciseList.js";
import ExerciseCard from "../components/cards/ExerciseCard";
import NavBar from "../components/new/NavBar.js";
import "./css/Home.css";

const Home = () => {
  const [bmi, setBmi] = React.useState();

  const ExerciseList = ({ exerciseType }) => {
    const exercises = EXERCISES_PER_TYPE[exerciseType];

    return (
      <>
        {Object.keys(EXERCISES).map((key, index) => {
          // Checks if the exercise is in the recommended list
          let isRecommended = exercises.includes(key);

          // Shows the card in the home page
          return (
            <ExerciseCard
              key={index}
              {...EXERCISES[key]}
              recommended={isRecommended}
            />
          );
        })}
      </>
    );
  };

  /**
   * This sets which cards are going to be shown in the page
   * @param {*} bmi
   * @returns
   */
  const evaluateBmi = (bmi) => {
    if (bmi < 18.5) {
      return "underWeight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "healthyWeight";
    } else if (bmi >= 25 && bmi <= 29.9) {
      return "overWeight";
    } else if (bmi >= 30) {
      return "obese";
    } else {
      return "healthyWeight";
    }
  };

  React.useEffect(() => {
    /**
     * This is called once everytime Home is loaded. This is to retrieve saved
     * profile from the database
     */
    const getProfile = async () => {
      try {
        const tokenType = localStorage.getItem("tokenType");
        const accessToken = localStorage.getItem("accessToken");

        // Retrieve profile if access token does exist
        if (accessToken) {
          const response = await axios.get(PROFILE_URL, {
            headers: {
              Authorization: `${tokenType} ${accessToken}`,
            },
          });

          // Save profile to localStorage
          localStorage.setItem("profile", JSON.stringify(response.data));
        } else {
          // If there no access token exist. Return to login page
          alert("You are not logged in.");
          window.location.href = "/login";
        }
      } catch (err) {
        alert("There seems to be an error retrieving profile");
        console.log(err);
      }
    };

    getProfile();

    // Once profile is saved, get the saved bmi from profile
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) setBmi(profile.bmi);
  }, []);

  return (
    <Box className="container home-container">
      <NavBar />
      <Typography className="home-exercises">Choose Exercise</Typography>
      <Box className="home-exercises-container">
        <ExerciseList exerciseType={evaluateBmi(bmi)} />
      </Box>
    </Box>
  );
};

export default Home;
