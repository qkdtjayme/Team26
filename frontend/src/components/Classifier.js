import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import React from "react";

const IMG_SIZE = 224;
const MAX_SEQ_LENGTH = 50;
const NUM_FEATURES = 2048;
const LABELS = [
  "barbell_biceps_curl",
  "deadlift",
  "jump_and_jacks",
  "lateral_raise",
  "lunges",
  "overhead_press",
  "push_up",
];

/**
 * Call this component whenever you want to open the camera when exercising.
 * @returns
 */
const Classifier = ({ predictionHandler }) => {
  const webcamRef = React.useRef(null);
  const featureExtractorRef = React.useRef(null);
  const lstmModelRef = React.useRef(null);
  const tensors = React.useRef([]);

  // Load the model upon mount
  React.useEffect(() => {
    const loadFeatureExtractor = async () => {
      const modelUrl = `/models/inception/model.json`;
      const model = await tf.loadLayersModel(modelUrl);
      featureExtractorRef.current = model;
    };

    const loadLSTMModel = async () => {
      const modelUrl = `/models/lstm/model.json`;
      const model = await tf.loadLayersModel(modelUrl);
      lstmModelRef.current = model;
    };

    loadFeatureExtractor();
    loadLSTMModel();
  }, []);

  /**
   * Preprocesses the image
   * @param {*} frame
   * @returns
   */
  const extractFeatures = (tensors) => {
    const res = tf.tidy(() => {
      const frameMask = tf.zeros([1, MAX_SEQ_LENGTH], "bool").arraySync();
      const frameFeatures = tf
        .zeros([1, MAX_SEQ_LENGTH, NUM_FEATURES], "float32")
        .arraySync();

      for (let i = 0; i < tensors.length; i++) {
        if (i >= MAX_SEQ_LENGTH) {
          break;
        }

        let tensor = tensors[i];
        // tensor = tf.reverse(tensor, [-1]); // Uncomment this if the tensor is in BGR format
        const prediction = featureExtractorRef.current
          .predict(tensor)
          .arraySync();
        frameFeatures[0][i] = prediction[0];
        frameMask[0][i] = true;
      }

      return {
        frameFeatures: tf.tensor(frameFeatures),
        frameMask: tf.tensor(frameMask),
      }; // Change this when needed
    });

    return res;
  };

  /**
   * Makes a prediction on the current frame
   */
  const predictFrame = async () => {
    if (
      webcamRef.current &&
      featureExtractorRef.current &&
      lstmModelRef.current
    ) {
      const frame = webcamRef.current.getScreenshot();
      const img = new Image();
      img.src = frame;

      tf.tidy(() => {
        img.onload = async () => {
          // Convert the image to a tensor
          let tensor = tf.browser
            .fromPixels(img)
            .resizeBilinear([IMG_SIZE, IMG_SIZE])
            .expandDims()
            .toFloat()
            .div(tf.scalar(255));

          tensors.current = tensors.current.concat(tensor);

          // If frames reached the MAX_SEQ_LENGTH, then start prediction using inception
          if (tensors.current.length > MAX_SEQ_LENGTH) {
            // Get features from inception
            console.log("Extracting features from frames...");
            const { frameFeatures, frameMask } = extractFeatures(
              tensors.current
            );

            // Clear tensors after processing
            tensors.current = [];

            try {
              const predictions = await lstmModelRef.current
                .predict([frameFeatures, frameMask])
                .data();

              const maxIndices = tf.tensor1d(predictions).argMax();
              const maxIndexValue = maxIndices.dataSync()[0];
              const classLabel = LABELS[maxIndexValue];

              console.log(`Predictions: ${predictions}`);
              console.log(`Predicted class index: ${maxIndexValue}`);
              console.log(`Predicted class label: ${classLabel}`);

              // Pass the predictions to the getter
              if (predictionHandler)
                predictionHandler({
                  idx: maxIndexValue,
                  label: classLabel,
                  probs: predictions,
                });
            } catch (err) {
              console.log(err);
            }
          }
        };
      });
    }
  };

  // This makes a prediction on the model every 100 milliseconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      predictFrame();
    }, 100);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef, featureExtractorRef, lstmModelRef]);

  return <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />;
};

export default Classifier;
