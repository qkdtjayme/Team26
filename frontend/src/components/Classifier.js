import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useRef } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawLandmarks, drawConnectors } from "@mediapipe/drawing_utils";
import { POSE_CONNECTIONS } from "@mediapipe/pose";

const IMG_SIZE = 224;
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
      lineWidth: 4,
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });
    canvasCtx.restore();
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
        const model = await tf.loadLayersModel(modelUrl);

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

  return (
    <div style={{ position: "relative" }}>
      <video
        ref={videoRef}
        id="webcam"
        style={{ width: 600, height: 540 }}
        autoPlay
      ></video>
      <canvas
        ref={canvasRef}
        className="output_canvas"
        id="output_canvas"
        width={600}
        height={540}
        style={{ position: "absolute", left: 0, top: 0 }}
      ></canvas>
    </div>
  );
};

export default Classifier;
