import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import React from "react";

const MAX_SEQ_LENGTH = 50;
const NUM_FEATURES = 2048;

/**
 * Call this component whenever you want to open the camera when exercising.
 * @returns
 */
const Classifier = ({ predictionHandler }) => {
  const webcamRef = React.useRef(null);
  const [model, setModel] = React.useState(null);

  // Load the model upon mount
  React.useEffect(() => {
    const loadModel = async () => {
      const modelUrl = `/models/88_model.json`;
      const model = await tf.loadLayersModel(modelUrl);
      setModel(model);
    };

    loadModel();
  }, []);

  /**
   * Preprocesses the image
   * @param {*} frame
   * @returns
   */
  const preprocessFrame = (frame) => {
    // TODO: IMPLEMENT PREPROCESSING HERE THE SAME AS FROM THE GOOGLE COLAB
    return frame; // Change this when needed
  };

  /**
   * Makes a prediction on the current frame
   */
  const predictFrame = async () => {
    if (webcamRef.current && model) {
      const frame = webcamRef.current.getScreenshot();
      const processedFrame = preprocessFrame(frame);
      try {
        const predictions = await model.predict(processedFrame);

        // Pass the predictions to the getter
        if (predictionHandler) predictionHandler(predictions);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // This makes a prediction on the model every 100 milliseconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      predictFrame();
    }, 100);

    return () => clearInterval(interval);
  }, [webcamRef, model]);

  return <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />;
};

export default Classifier;
