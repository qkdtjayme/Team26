import React, { useState } from 'react';
import '../Navbar.css';

const Overweight = () => {
    const [activeTab, setActiveTab] = useState('exercise');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="body1">
            <div className="dashboard-container">
                <div className="navigation">
                    <div className={`nav-item ${activeTab === 'exercise' ? 'active' : ''}`} onClick={() => handleTabChange('exercise')}>Exercises</div>
                    <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabChange('profile')}>Profile</div>
                </div>
                <div className="tab-content">
                    {activeTab === 'exercise' && <HomeTab />}
                    {activeTab === 'profile' && <ProfileTab />}
                </div>
            </div>
        </div>
    );
};

const HomeTab = () => {

    const handleCurl = () => {
        alert('Are you READY? READY!');
        window.location.href = '/curl';
    };

    const handleRow = () => {
        alert('Are you READY? READY!');
        window.location.href = '/row';
    };

    const handleJack = () => {
        alert('Are you READY? READY!');
        window.location.href = '/jack';
    };

    const handleRaise = () => {
        alert('Are you READY? READY!');
        window.location.href = '/raise';
    };

    const handleLunge = () => {
        alert('Are you READY? READY!');
        window.location.href = '/lunge';
    };

    const handleLift = () => {
        alert('Are you READY? READY!');
        window.location.href = '/lift';
    };

    const handlePushup = () => {
        alert('Are you READY? READY!');
        window.location.href = '/pushup';
    };

    const handleSquat = () => {
        alert('Are you READY? READY!');
        window.location.href = '/squat';
    };

    return(
        <div className="body2">
            <div className="dashboard-container">
                <h2 style={styles.heading}>Choose Exercise</h2>
            </div>
            <div className="exercise">
                <div style={styles.exercise}>
                    <div className="picture">
                        <h1 style={styles.text}>BARBELL BICEPS CURL</h1>
                        <div style={styles.reco}>
                            <h3 style={styles.text2}>Recommended</h3>
                        </div>
                        <h2 style={styles.text1}>LEGS & ARMS | 3 Minutes </h2>
                        <button type="submit" style={styles.start} onClick={handleCurl}>Click to Start</button>
                    </div>
                </div>
                <div style={styles.exercise}>
                    <div className="picture2">
                        <h1 style={styles.text}>BARBELL ROW</h1>
                        <div style={styles.reco}>
                            <h3 style={styles.text2}>Recommended</h3>
                        </div>
                        <h2 style={styles.text1}>DEAD LIFT | 3 Minutes </h2>
                        <button type="submit" style={styles.start} onClick={handleRow}>Click to Start</button>
                    </div>
                </div>
                <div style={styles.exercise}>
                    <div className="picture3">
                        <h1 style={styles.text}>DEAD LIFT</h1>
                        <div style={styles.reco1} />
                        <h2 style={styles.text1}>CHEST & ARMS | 3 Minutes </h2>
                        <button type="submit" style={styles.start} onClick={handleLift}>Click to Start</button>
                    </div>
                </div>
                <div style={styles.exercise}>
                    <div className="picture4">
                        <h1 style={styles.text}>JUMP & JACKS</h1>
                        <div style={styles.reco1} />
                        <h2 style={styles.text1}>DEAD LIFT | 3 Minutes </h2>
                        <button type="submit" style={styles.start} onClick={handleJack}>Click to Start</button>
                    </div>
                </div>
                <div style={styles.exercise}>
                    <div className="picture5">
                        <h1 style={styles.text}>LATERAL RAISE</h1>
                        <div style={styles.reco1} />
                        <h2 style={styles.text1}>CHEST & ARMS | 3 Minutes </h2>
                        <button type="submit" style={styles.start} onClick={handleRaise}>Click to Start</button>
                    </div>
                </div>
                <div style={styles.exercise}>
                    <div className="picture6">
                        <h1 style={styles.text}>LUNGES</h1>
                        <div style={styles.reco1} />
                        <h2 style={styles.text1}>DEAD LIFT | 3 Minutes </h2>
                        <button type="submit" style={styles.start} onClick={handleLunge}>Click to Start</button>
                    </div>
                </div>
                <div style={styles.exercise}>
                    <div className="picture8">
                        <h1 style={styles.text}>PUSH UPS</h1>
                        <div style={styles.reco}>
                            <h3 style={styles.text2}>Recommended</h3>
                        </div>
                        <h2 style={styles.text1}>DEAD LIFT | 3 Minutes </h2>
                        <button type="submit" style={styles.start} onClick={handlePushup}>Click to Start</button>
                    </div>
                </div>
                <div style={styles.exercise}>
                    <div className="picture10">
                        <h1 style={styles.text}>SQUAT</h1>
                        <div style={styles.reco1} />
                        <h2 style={styles.text1}>DEAD LIFT | 3 Minutes </h2>
                        <button type="submit" style={styles.start} onClick={handleSquat}>Click to Start</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileTab = () => {
    const [username, setUsername] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

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

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    
    const handleNice= () => {
        alert('Progress Saved!');
        window.location.href = '/homepage';
    };

    const handleLogout= () => {
        alert('Logging Out!');
        window.location.href = '/login';
    };

    return (
    <div className="body2">
        <div className="dashboard-container">
            <h2 style={styles.heading}>Profile Settings</h2>
                <div className="user" />
                    <div style={styles.container2}>
                        <h3 style={styles.text4}>Name: </h3>
                        <h3 style={styles.text3}>{username}</h3>
                        <h3 style={styles.text4}>Height:</h3>
                        <h3 style={styles.text3}>{height ? `${height} m` : ''}</h3>
                        <h3 style={styles.text4}>Weight:</h3>
                        <h3 style={styles.text3}>{weight ? `${weight} kg` : ''}</h3>
                        <h3 style={styles.text4}>BMI: </h3>
                        <h3 style={styles.text3}>{calculateBMI()}</h3>
                        <h3 style={styles.text4}>Category:</h3>
                        <h3 style={styles.text3}>{classifyBMI(calculateBMI())}</h3>
                    </div>
                 </div>
        <div>
            <label htmlFor="username" style={styles.label}>Username</label>
                <input
                    type="string"
                    id="username"
                    placeholder="Enter your name"
                    value={username}
                    onChange={handleUsernameChange} 
                    style={styles.input}
                />
        </div>
        <div>
            <label htmlFor="height" style={styles.label}>Height</label>
                <input
                    type="number"
                    id="height"
                    placeholder="Enter your height in m"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    style={styles.input}
                />
        </div>
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
        <div style={styles.container1}>
            <div style={styles.container1}>
                <h2 style={styles.heading}>Progress Report</h2>
                    <button type="submit" style={styles.button} onClick={handleNice}>Save Profile</button>
                <button type="submit" style={styles.button1} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
    );
};

export default Overweight;

const styles = {
    container: {
        padding: '50px',
        borderRadius: '40px',
        backgroundColor: 'transparent',
        border: '5px solid transparnt',
    },
    container1: {
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
    },
    container2: {
        padding: '10px',
        paddingLeft: '30px',
        borderRadius: '30px',
        backgroundColor: '#DFA100',
        marginRight: '300px',
        marginTop: '10px',
    },
    exercise: {
        padding: '20px',
        paddingRight: '22px',
        borderRadius: '30px',
        backgroundColor: '#DFA100',
        marginBottom: '20px',
        margin: '20px',
    },
    heading: {
        textAlign: 'center',
        font: 'Viga',
        fontSize: '35px',
        fontWeight: 'bold',
        lineHeight: '65px',
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
    text: {
        textAlign: 'left',
        fontSize: '20px',
        color: '#fff',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        marginLeft: '20px',
    },
    text1: {
        fontSize: '10px',
        color: '#fff',
        fontWeight: '10px',
        whiteSpace: 'nowrap',
        textAlign: 'left',
        marginLeft: '20px',
    },
    text2: {
        fontSize: '10px',
        color: '#000000',
        fontWeight: '10px',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        justifyContent: 'center',
    },
    text3: {
        fontSize: '20px',
        color: '#fff',
        fontWeight: '10px',
        textAlign: 'left',
        whiteSpace: 'nowrap',
    },
    text4: {
        fontSize: '20px',
        color: '#000000',
        fontWeight: '10px',
        textAlign: 'left',
        whiteSpace: 'nowrap',
    },
    reco: {
        borderRadius: '10px',
        backgroundColor: '#FFFF00',
        border: '2px solid transparent',
        margin: '5px',
        width: '80px', 
        height: '30px',
        marginLeft: '5px',
    },
    reco1: {
        borderRadius: '10px',
        border: '2px solid transparent',
        margin: '5px',
        width: '80px', 
        height: '30px',
        marginLeft: '5px',
    },
    start: {
        borderRadius: '20px',
        cursor: 'pointer',
        backgroundColor: '#808080',
        color: '#fff',
        border: '2px solid #808080',
        margin: '5px',
        width: '100px', 
        height: '35px',
        alignItems: 'left',
        whiteSpace: 'nowrap',
        marginLeft: '5px',
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
    button1: {
        padding: '15px 35px',
        backgroundColor: '#DFA100',
        color: '#fff',
        border: '2px solid #DFA100',
        borderRadius: '3px',
        cursor: 'pointer',
        margin: '20px',
        alignItems: 'center',
    },
};