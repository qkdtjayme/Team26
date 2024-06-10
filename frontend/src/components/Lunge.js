import React, { useState, useEffect } from "react";
import Classifier from "./Classifier.js";
import { addRecordToDb } from "../db/records.js";
import lunge from "../components/vids/lunge.mp4";
import "../pages/css/Home.css";

const Lunge = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [timer, setTimer] = useState(90);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleHome = () => {
    // Adds record to db
    addRecordToDb("Lunges", sets, reps, (err, response) => {
      if (err) console.log(err);
    });

    window.location.href = "/homepage";
  };

  // Controls the cameras
  const cameraClick = () => {
    setShowCamera(true);
    setTimer(90);
    setIsTimerRunning(false);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setShowCamera(false);
  };

  // Gets the prediction from the classifier
  const predictionHandler = (predictions) => {
    if (predictions) {
      //   console.log(predictions); // ? Uncomment for debugging
      // TODO: Handle predictions from here. Count sets or reps based on your algorithm.
    }
  };

  return (
    <div className="home-container">
      <div className="dashboard-container">
        <h2 style={styles.heading}>Start Workout</h2>
        <div className="video">
          <video
            src={lunge}
            autoPlay
            loop
            muted
            height={600}
            width={600}
          ></video>
           <div style={styles.webContainer}>
            <div style={styles.buttonContainer}>
                <div className="finishButton">
                  <button
                    type="submit"
                    style={styles.button}
                    onClick={cameraClick}
                  >
                    Start Workout
                  </button>
                  <button
                    type="submit"
                    style={styles.button}
                    onClick={startTimer}
                  >
                    Rest
                  </button>
                </div>
              </div>
              <div style={styles.camera}>
                {showCamera && (
                  <Classifier predictionHandler={predictionHandler} />
                )}
              </div>
              <div style={styles.text}>
                <h2>Set: {sets} Sets</h2>
                <h2>Rest Duration: {timer} seconds</h2>
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

export default Lunge;

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
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: "500px", 
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
  finishButton: {
    padding: "15px 35px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#DFA100",
    color: "#fff",
    border: "2px solid #DFA100",
    display: "flex",
    margin: "5px",
    marginTop: "20px",
  },
};