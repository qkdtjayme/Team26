import React, { useState, useEffect } from "react";
import Classifier from "./Classifier.js";
import { addRecordToDb } from "../db/records.js";
import jacks from "../components/vids/jacks.mp4";
import "../pages/css/Home.css";

const Jack = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [timer, setTimer] = useState(180);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // For correct / incorrect
  const [hasStarted, setHasStarted] = useState(false);
  const [isCorrectState, setIsCorrectState] = useState(false);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);

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
    addRecordToDb("Jump and Jacks", sets, reps, (err, response) => {
      if (err) console.log(err);
    });

    window.location.href = "/homepage";
  };

  // Controls the cameras
  const cameraClick = () => {
    setHasStarted(true);
    setIsTimerRunning(false);
    setTimer(180);
    setShowCamera(true);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setShowCamera(false);
  };

  const LABEL = "jump_and_jacks";
  const COOLDOWN_TIME = 2000; // 2 seconds cooldown

  const predictionHandler = (predictions) => {
    if (predictions) {
      // console.log(predictions); // Uncomment for debugging

      if (predictions.label !== LABEL) {
        setIsCorrectState(false);
        setIncorrectCount((prevCount) => prevCount + 1);
      } else if (!isCooldown) {
        setIsCorrectState(true);
        setReps((prevReps) => {
          const newReps = prevReps + 1;
          if (newReps >= 12) {
            setSets((prevSets) => {
              const newSets = prevSets + 1;
              if (newSets >= 4) {
                setShowCamera(false); // Close the camera after 4 sets
              }
              return newSets;
            });
            return 0;
          }
          return newReps;
        });
        setIsCooldown(true);
        setTimeout(() => setIsCooldown(false), COOLDOWN_TIME);
      }
    }
  };

  return (
    <div className="home-container">
      <div className="dashboard-container">
        <h2 style={styles.heading}>Start Workout</h2>
        <div className="video">
          <video
            src={jacks}
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
                {isCorrectState && <h2 style={{ color: "green" }}>JumpingJacks</h2>}
              </div>
            </div>
            <div style={styles.camera}>
              {showCamera && (
                <Classifier predictionHandler={predictionHandler} />
              )}
            </div>
            <div style={styles.text}>
              {hasStarted ? (
                isCorrectState ? (
                  <h2 style={{ color: "green" }}>Correct Exercise!</h2>
                ) : (
                  <h2 style={{ color: "red" }}>Incorrect. Check Exercise!</h2>
                )
              ) : (
                ""
              )}
              <h2>
                Set: {sets} | <span style={styles.greenText}>4</span>
              </h2>
              <h2>
                Rep: {reps} | <span style={styles.greenText}>12</span>
              </h2>
              <h2>
                Rest Duration:{" "}
                <span style={styles.greenText}>{timer} seconds</span>
              </h2>
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


export default Jack;

const styles = {
  heading: {
    textAlign: "center",
    font: "Viga",
    fontSize: "35px",
    fontWeight: "bold",
    lineHeight: "65px",
    color: "#fff",
  },
  greenText: {
    color: "green",
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
