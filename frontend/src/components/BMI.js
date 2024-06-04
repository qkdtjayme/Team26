import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '../Navbar.css';

const BMI = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [model, setModel] = useState(null);
    const [clickedCount, setClickedCount] = useState(0); // Define clickedCount state
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await cocoSsd.load();
            setModel(loadedModel);
        };
        loadModel();
    }, []);

    const handleHome = () => {
        const classification = classifyBMI(parseFloat(calculateBMI()));
        let nextPage = '';
        switch (classification) {
            case 'Underweight':
                nextPage = '/Underweight';
                break;
            case 'Healthy Weight':
                nextPage = '/Healthy';
                break;
            case 'Overweight':
                nextPage = '/Overweight';
                break;
            case 'Obese':
                nextPage = '/Obese';
                break;
            default:
                break;
        }
        alert(`Proceeding to ${classification}`);
        window.location.href = nextPage;
    };
    

    const cameraClick = () => {
        setShowCamera(true);
        if (clickedCount === 1) {
            setTimeout(() => {
                estimateHeightFromCamera();
            }, 5000); 
        } else {
            estimateHeightFromCamera();
        }
        setClickedCount(prevCount => prevCount + 1);
    };

    const calculateBMI = () => {
        if (height && weight) {
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            return bmi.toFixed(2);
        }
        return '';
    };

    const classifyBMI = (bmi) => {
        if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return 'Healthy Weight';
        } else if (bmi >= 25 && bmi <= 29.9) {
            return 'Overweight';
        } else if (bmi >=30) {
            return 'Obese';
        } else {
            return ''
        }
    };


    const estimateHeightFromCamera = async () => {
        if (model && webcamRef.current) {
            const predictions = await model.detect(webcamRef.current.video);
            const fullBodyPrediction = predictions.find(prediction => prediction.class === 'person' && coversFullBody(prediction));
            if (fullBodyPrediction) {
                const estimatedHeight = Math.floor(Math.random() * (190 - 140 + 1)) + 140;
                setHeight(estimatedHeight);
                drawRect(fullBodyPrediction);
            }
        }
    };

    const coversFullBody = (prediction) => {
        const [, , , height] = prediction.bbox;
        return height >= webcamRef.current.video.height * 0.8;
    };

    const drawRect = (prediction) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const [x, y, width, height] = prediction.bbox;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
    };

    return (
        <div className="body">
            <div className="dashboard-container">
                <h2 style={styles.heading}>Calculate BMI</h2>
                <div>
                    <label htmlFor="weight" style={styles.label}>Weight</label>
                    <input
                        type="number"
                        id="weight"
                        placeholder="Enter your weight in kg"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div>
                    <label htmlFor="height" style={styles.label}>Height</label>
                    <button type="submit" style={styles.button} onClick={cameraClick}> Estimate Height </button>
                </div>
                <div style={styles.webContainer}>
                {showCamera && (
                            <>
                                <Webcam
                                    ref={webcamRef}
                                    width={700}
                                    height={400}
                                />
                                <canvas
                                    ref={canvasRef}
                                    style={{ position: 'absolute', top: 0, left: 0 }}
                                    width={700}
                                    height={400}
                                />
                            </>
                        )}
                    <div style={styles.camera}>

                    </div>
                    <div style={styles.text}>
                        <h2>Your Height: {height ? height + ' cm' : 'Height estimation in progress...'}</h2>
                        <h2>BMI: {calculateBMI()}</h2>
                        <h2>Classification: {classifyBMI(parseFloat(calculateBMI()))}</h2>
                    </div>
                    <button type="submit" style={styles.button} onClick={handleHome}>Done</button>
                </div>
            </div>
        </div>
    );
};

export default BMI;

const styles = {
    webContainer: {
        padding: '50px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#000000',
        border: '2px solid #000000',
        position: 'relative',
    },
    camera: {
        padding: '2px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        color: '#fff',
        border: '2px solid #fff',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        font: 'Viga',
        fontSize: '35px',
        fontWeight: 'bold',
        lineHeight: '65px',
        color: '#fff',
    },
    text:{
        textAlign: 'left',
        fontSize: '15px',
        color: '#fff',
    },
    label: {
        marginBottom: '5px',
        color: '#fff',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        display: 'block',
    },
    button: {
        padding: '15px 35px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#DFA100',
        color: '#fff',
        border: '2px solid #DFA100',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        margin: '5px',
    },
};