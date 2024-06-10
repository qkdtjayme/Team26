import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import React, { useEffect, useRef } from "react";
import { Pose } from "@mediapipe/pose";

const IMG_SIZE = 224;
const LABELS = [
  "barbell_biceps_curl",
  "deadlift",
  "jump_and_jacks",
  "lateral_raise",
  "lunges",
  "overhead_press",
  "push_up",
];

const Classifier = ({ predictionHandler }) => {
  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const poseRef = useRef(null);
  const tensors = useRef([]);

  useEffect(() => {
    const loadModel = async () => {
      const modelUrl = `/models/inception/model.json`;
      const model = await tf.loadLayersModel(modelUrl);
      modelRef.current = model;
    };

    const initializePose = async () => {
      poseRef.current = new Pose({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      poseRef.current.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      poseRef.current.onResults(handlePoseResults);
    };

    loadModel();
    initializePose();
  }, []);

  const handlePoseResults = async (results) => {
    if (!results.poseLandmarks) {
      tensors.current = [];
      return;
    }

    const tensor = tf.tidy(() => {
      const keypoints = results.poseLandmarks.map((landmark) => [
        landmark.x,
        landmark.y,
        landmark.z,
      ]);
      return tf.tensor2d(keypoints).reshape([1, keypoints.length * 3]);
    });

    tensors.current = tensors.current.concat(tensor);

    if (tensors.current.length >= 1) {
      console.log("Extracting features from frames...");
      const frameFeatures = extractFeatures(tensors.current);
      tensors.current = [];

      try {
        const predictions = await modelRef.current
          .predict(frameFeatures)
          .data();

        const maxIndexValue = predictions.indexOf(Math.max(...predictions));
        const classLabel = LABELS[maxIndexValue];

        console.log(`Predictions: ${predictions}`);
        console.log(`Predicted class index: ${maxIndexValue}`);
        console.log(`Predicted class label: ${classLabel}`);

        if (predictionHandler) {
          predictionHandler({
            idx: maxIndexValue,
            label: classLabel,
            probs: predictions,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const extractFeatures = (tensors) => {
    const frameFeatures = tf.concat(tensors, 0);
    return frameFeatures;
  };

  const predictFrame = async () => {
    if (webcamRef.current && modelRef.current && poseRef.current) {
      const frame = webcamRef.current.getScreenshot();
      const img = new Image();
      img.src = frame;

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = IMG_SIZE;
        canvas.height = IMG_SIZE;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, IMG_SIZE, IMG_SIZE);

        const imageData = ctx.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
        const rgbImageData = new ImageData(
          new Uint8ClampedArray(imageData.data),
          IMG_SIZE,
          IMG_SIZE
        );

        await poseRef.current.send({ image: rgbImageData });
      };
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      predictFrame();
    }, 100);

    return () => clearInterval(interval);
  }, [webcamRef, modelRef, poseRef]);

  return <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />;
};

export default Classifier;
