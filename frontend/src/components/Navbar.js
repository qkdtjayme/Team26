import React, { useState } from 'react';
import '../Navbar.css';

const NavBar = () => {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="body">
            <div className="dashboard-container">
                <div className="navigation">
                    <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabChange('home')}>Home</div>
                    <div className={`nav-item ${activeTab === 'about' ? 'active' : ''}`} onClick={() => handleTabChange('about')}>About</div>
                </div>
                <div className="tab-content">
                    {activeTab === 'home' && <HomeTab />}
                    {activeTab === 'about' && <AboutTab />}
                </div>
            </div>
        </div>
    );
};

const HomeTab = () => {

    const handleLogin = () => {
        window.location.href = '/login';
    }

    const handleCreate = () => {
        window.location.href = '/signup';
    }

    return (
        <div style={styles.container}>
            <div style={styles.container1}>
                <h1 style={styles.font}> REACH YOUR LIMITS AND GET TO THE NEXT LEVEL </h1>
                <button type="submit" style={styles.button} onClick={handleLogin}> LOGIN </button>
                <button type="submit" style={styles.button1} onClick={handleCreate}> CREATE ACCOUNT NOW </button>
            </div>
        </div>
    );
};

const AboutTab = () => {
    return (
        <div>
            <h1 style={styles.font2}> About the Developers </h1>
            <div style={styles.container2}>
                <div style={styles.developerContainer}>
                    <img src="path_to_image_renzo" alt="Renzo James M. Cabanos" style={styles.image} />
                    <h2 style={styles.font3}>Renzo James M. Cabanos</h2>
                </div>
                <div style={styles.developerContainer}>
                    <img src="path_to_image_karla" alt="Karla Danielle T. Jayme" style={styles.image} />
                    <h2 style={styles.font3}>Karla Danielle T. Jayme</h2>
                </div>
                <div style={styles.developerContainer}>
                    <img src="path_to_image_selwyn" alt="Selwyn Charlz Angelo Z. Landayan" style={styles.image} />
                    <h2 style={styles.font3}>Selwyn Charlz Angelo Z. Landayan</h2>
                </div>
                <div style={styles.developerContainer}>
                    <img src="path_to_image_daniel" alt="Daniel Joven U. Suyat" style={styles.image} />
                    <h2 style={styles.font3}>Daniel Joven U. Suyat</h2>
                </div>
                <div style={styles.developerContainer}>
                    <img src="path_to_image_arvin" alt="Arvin A. Tagongtong" style={styles.image} />
                    <h2 style={styles.font3}>Arvin A. Tagongtong</h2>
                </div>
                <div style={styles.font4}>
                    <h3>This Web Application is intended for Project Design only.</h3>
                </div>
            </div>
        </div>
    );
};

export default NavBar;

const styles = {
    container: {
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
    },
    container1: {
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
    },
    container2: {
        padding: '50px',
        borderRadius: '50px',
        backgroundColor: 'transparent',
        border: '5px solid transparent',
    },
    developerContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    image: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    button: {
        padding: '15px 35px',
        backgroundColor: 'transparent',
        color: '#fff',
        border: '2px solid #fff',
        borderRadius: '3px',
        cursor: 'pointer',
        marginTop: '20px',
        alignItems: 'center',
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
    font: {
        fontFamily: 'Poppins',
        fontSize: '45px',
        fontWeight: '700',
        lineHeight: '60px',
        letterSpacing: '0em',
        textAlign: 'center',
        marginTop: '250px',
        color: '#fff',
    },
    font1: {
        fontFamily: 'Rubik',
        fontSize: '30px',
        fontWeight: '800',
        lineHeight: '36px',
        letterSpacing: '0em',
        textAlign: 'left',
        color: '#fff',
    },
    font2: {
        fontFamily: 'Rubik',
        fontSize: '30px',
        fontWeight: '800',
        lineHeight: '36px',
        letterSpacing: '0em',
        textAlign: 'center',
        color: '#fff',
    },
    font3: {
        fontFamily: 'Rubik',
        fontSize: '15px',
        fontWeight: '800',
        lineHeight: '36px',
        letterSpacing: '0em',
        textAlign: 'left',
        color: '#fff',
        whiteSpace: 'nowrap',
    },
    font4: {
        fontFamily: 'Rubik',
        fontSize: '10px',
        fontWeight: '800',
        lineHeight: '36px',
        letterSpacing: '0em',
        textAlign: 'center',
        color: '#fff',
        whiteSpace: 'nowrap',
    },
};
