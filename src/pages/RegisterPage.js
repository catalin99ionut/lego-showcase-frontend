import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthService';

import '../styles.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await registerUser({ username, password });
            navigate('/login');
        } catch (error) {
            setError("Registration failed. Try a different username.");
        }
    };

    return (
        <div className="page-container">
            <h2 className="page-title">Register</h2>
            {error && <p className="error">{error}</p>}
            <form className="form-group" onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="primary-button">Register</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
                Already have an account?{' '}
                <button
                    className="link-button"
                    onClick={() => navigate('/login')}
                >
                    Log in here
                </button>
            </p>
        </div>
    );
};

export default RegisterPage;
