import React, { useState } from 'react';
import Webcam from 'react-webcam';
import row from '../components/vids/row.mp4';

const Row = () => {
    const [showCamera, setShowCamera] = useState(false);
    const [ExerCount, setExerCount] = useState(0);

    const handleHome = () => {
        alert('Proceeding to Homepage');
        window.location.href = '/homepage';
    };

    const cameraClick = () => {
        setShowCamera(true);
    };

    const ExerClick = () => {
        setExerCount(ExerCount + 1);
        cameraClick();
    };

    return (
        <div className="body3">
            <div className="dashboard-container">
            <h2 style={styles.heading}>Start Workout</h2>
                <div className="video">
                    <video src={row} autoPlay loop muted
                    height={600} 
                    width={800}>
                    </video>
                        <div style={styles.webContainer}>
                                <div className="button1">
                                    <button type="submit" style={styles.button1} onClick={ExerClick}>Start Workout</button>
                                </div>
                            <div style={styles.camera}>
                                {showCamera && (
                                <Webcam 
                                height={500} 
                                width={740}
                                />
                                )}
                            </div>
                            <div style={styles.text}>
                                <h2>Set: {ExerCount} Sets</h2>
                                <h2>Duration:</h2>
                                <h2>Rep:</h2>
                            </div>
                            <button type="submit" style={styles.button} onClick={handleHome}>Finish Workout</button>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Row;

const styles = {
    heading: {
        textAlign: 'center',
        font: 'Viga',
        fontSize: '35px',
        fontWeight: 'bold',
        lineHeight: '65px',
        color: '#fff',
    },
    webContainer: {
        padding: '20px',
        cursor: 'pointer',
        backgroundColor: '#000000',
        border: '2px solid #000000',
        borderRadius: '20px',
        marginRight: '170px',
    },
    camera: {
        padding: '2px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        color: '#fff',
        border: '2px solid #fff',
        alignItems: 'center',
    },
    text:{
        textAlign: 'left',
        fontSize: '15px',
        color: '#fff',
    },
    button: {
        padding: '15px 35px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#DFA100',
        color: '#fff',
        border: '2px solid #DFA100',
        display: 'flex',
        margin: '5px', 
    },
    button1: {
        padding: '15px 35px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#DFA100',
        color: '#fff',
        border: '2px solid #DFA100',
        alignItems: 'right',
        margin: '5px', 
    },
};