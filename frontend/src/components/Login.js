import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (e) => {
        if (!username || !password) {
            alert('Please fill in all fields.');
            return;
        } else {
            alert("Login Successful");
            window.location.href = "/homepage";
        }

        e.preventDefault(); 
        console.log(username, password);
        
        fetch("http://localhost:5000/login-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Failed to login. Please try again.');
            }
        })
        .then((data) => {
            console.log(data, "userLogin");
        })
        .catch(error => {
            console.error("Wrong Username or Password", error);
        });
    }; 
    

    return (
        <div className="body">
            <div className="dashboard-container">
                    <form style={styles.form}>
                        <h2 style={styles.heading}>Login</h2>
                            <div>
                                <label htmlFor="username" style={styles.label}>Username: </label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" style={styles.label}>Password: </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                    </form>
                    <button type="submit" style={styles.button} onClick={handleLogin}>Login</button>
                        <div style={styles.signupLink}>
                            Don't have an account? <Link to="/signup" style={styles.link}>Sign up here</Link>.
                         </div>
            </div>
        </div>
    );
};

export default Login;

const styles = {
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        font: 'Viga',
        fontSize: '35px',
        fontWeight: 'bold',
        lineHeight: '65px',
        color: '#fff',
        marginTop: '250px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
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
    },
    signupLink: {
        marginTop: '10px',
        textAlign: 'center',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
};
