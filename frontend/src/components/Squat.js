import React, { useState } from "react";
import Classifier from "./Classifier.js";
import { addRecordToDb } from "../db/records.js";
import squat from "../components/vids/squat.mp4";

const Squat = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);

  const handleHome = () => {
    // Adds record to db
    addRecordToDb("Squats", sets, reps, (err, response) => {
      if (err) console.log(err);
    });

    window.location.href = "/homepage";
  };

  // Controls the cameras
  const cameraClick = () => {
    setShowCamera(true);
  };

  // Gets the prediction from the classifier
  const predictionHandler = (predictions) => {
    if (predictions) {
      //   console.log(predictions); // ? Uncomment for debugging
      // TODO: Handle predictions from here. Count sets or reps based on your algorithm.
    }
  };

  return (
    <div className="body3">
      <div className="dashboard-container">
        <h2 style={styles.heading}>Start Workout</h2>
        <div className="video">
          <video
            src={squat}
            autoPlay
            loop
            muted
            height={600}
            width={800}
          ></video>
          <div style={styles.webContainer}>
            <div className="button1">
              <button
                type="submit"
                style={styles.button1}
                onClick={cameraClick}
              >
                Start Workout
              </button>
            </div>
            <div style={styles.camera}>
              {showCamera && (
                <Classifier predictionHandler={predictionHandler} />
              )}
            </div>
            <div style={styles.text}>
              <h2>Set: {sets} Sets</h2>
              <h2>Duration:</h2>
              <h2>Rep: {reps}</h2>
            </div>
            <button type="submit" style={styles.button} onClick={handleHome}>
              Finish Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Squat;

const styles = {
  heading: {
    textAlign: "center",
    font: "Viga",
    fontSize: "35px",
    fontWeight: "bold",
    lineHeight: "65px",
    color: "#fff",
  },
  webContainer: {
    padding: "20px",
    cursor: "pointer",
    backgroundColor: "#000000",
    border: "2px solid #000000",
    borderRadius: "20px",
    marginRight: "170px",
  },
  camera: {
    padding: "2px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#fff",
    border: "2px solid #fff",
    alignItems: "center",
  },
  text: {
    textAlign: "left",
    fontSize: "15px",
    color: "#fff",
  },
  button: {
    padding: "15px 35px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#DFA100",
    color: "#fff",
    border: "2px solid #DFA100",
    display: "flex",
    margin: "5px",
  },
  button1: {
    padding: "15px 35px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#DFA100",
    color: "#fff",
    border: "2px solid #DFA100",
    alignItems: "right",
    margin: "5px",
  },
};
