import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useRef } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawLandmarks, drawConnectors } from "@mediapipe/drawing_utils";
import { POSE_CONNECTIONS } from "@mediapipe/pose";

const LABELS = [
  "barbell_biceps_curl",
  "deadlift",
  "jump_and_jacks",
  "lunges",
  "overhead_press",
  "push_up",
];

const Classifier = ({ predictionHandler }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasCtxRef = useRef(null);

  // For models
  const classifierModelRef = useRef(null);
  const poseRef = useRef(null);
  const keypointsRef = useRef(null);

  const onResults = (results) => {
    if (!results.poseLandmarks) {
      return;
    }

    const canvasCtx = canvasCtxRef.current;
    const canvasElement = canvasRef.current;

    // Draws keypoints on the screen
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: "#00FF00",
      lineWidth: 1,
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "#FF0000",
      radius: 0.5,
    });
    canvasCtx.restore();

    // Store keypoints
    keypointsRef.current = results.poseLandmarks;
  };

  const makePredictions = async () => {
    const keypoints = keypointsRef.current;
    if (!keypoints) {
      console.log("No keypoints found");
      return;
    }

    // Format input
    let input = [];
    for (const keypoint of keypoints) {
      for (const key in keypoint) {
        input.push(keypoint[key]);
      }
    }

    try {
      // Create the input tensor and make predictions using executeAsync
      const inputTensor = tf.tensor1d(input).expandDims();

      // Use executeAsync for dynamic operations
      const predictions = await classifierModelRef.current.execute(inputTensor);

      // Extract prediction values
      const classPrediction = predictions.argMax(-1); // Get the index of the highest probability
      const classIndex = (await classPrediction.data())[0];
      const classLabel = LABELS[classIndex];

      const results = {
        idx: classIndex,
        label: classLabel,
        prob: (await predictions.data())[classIndex], // Probability of the predicted class
      };

      // Send results to prediction handler
      predictionHandler(results);

      // Dispose tensors to free memory
      tf.dispose([inputTensor, predictions, classPrediction]);
    } catch (error) {
      console.error("Error during model execution:", error);
    }
  };

  useEffect(() => {
    const initializePoseLandmarker = async () => {
      // Initialize pose
      const pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });
      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults(onResults);
      poseRef.current = pose;
    };

    const startWebcam = () => {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (poseRef.current) {
            await poseRef.current.send({ image: videoRef.current });
          }
        },
        width: 600,
        height: 540,
      });

      camera.start();
    };

    const loadModel = async () => {
      try {
        const modelUrl = `/models/classifier/model.json`;
        const model = await tf.loadGraphModel(modelUrl);

        classifierModelRef.current = model;
      } catch (error) {
        console.error("Error loading the model:", error);
      }
    };

    canvasCtxRef.current = canvasRef.current.getContext("2d");
    loadModel();
    initializePoseLandmarker();
    startWebcam();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      makePredictions();
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div style={{ position: "relative", minWidth: 540 }}>
      <video
        ref={videoRef}
        id="webcam"
        style={{ width: "100%", height: 540, minHeight: 540 }}
        autoPlay
      ></video>
      <canvas
        ref={canvasRef}
        className="output_canvas"
        id="output_canvas"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          minHeight: 540,
        }}
      ></canvas>
    </div>
  );
};

export default Classifier;
