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
                    <div className={`nav-item ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => handleTabChange('contact')}>Contact Us</div>
                </div>
                <div className="tab-content">
                    {activeTab === 'home' && <HomeTab />}
                    {activeTab === 'about' && <AboutTab />}
                    {activeTab === 'contacts' && <ContactTab />}
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
                <h2 style={styles.font3}>Renzo James M. Cabanos</h2>
                <h2 style={styles.font3}>Karla Danielle T. Jayme</h2>
                <h2 style={styles.font3}>Selwyn Charlz Angelo Z. Landayan</h2>
                <h2 style={styles.font3}>Daniel Joven U. Suyat</h2>
                <h2 style={styles.font3}>Arvin A. Tagongtong</h2>
            </div>
        </div>
    )
}

const ContactTab = () => {
    return (
        <div>

        </div>
    )
}


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
        border: '5px solid transparnt',
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
};
