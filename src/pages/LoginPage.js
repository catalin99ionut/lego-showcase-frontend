import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { login, getCurrentUser, logout } from "../services/AuthService";

import '../styles.css';

const LoginPage = () => {
    const { user, login: loginUser, logout } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                if (currentUser) {
                    loginUser(currentUser);
                    navigate("/home");
                }
            } catch (error) {}
        };
        checkUser();
    }, [loginUser, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ username, password });
            loginUser(userData);
            navigate("/home");
        } catch (error) {
            setError('Invalid username or password.');
        }
    };

    const handleLogout = async () => {
        await logout();
        logout();
    }

    return (
        <div className="page-container">
            <h2 className="page-title">Login</h2>

            {user ? (
                <div style={{ textAlign: "center" }}>
                    <p>Hello, {user.username}!</p>
                    <button className="primary-button" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <>
                    {error && <p className="error">{error}</p>}
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="from-input"
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
                                className="from-input"
                            />
                        </div>
                        <button type="submit" className="primary-button">Login</button>
                    </form>
                </>
            )}

            {!user && (
                <p style={{ textAlign: "center", marginTop: '10px' }}>
                    Don't have an account?{' '}
                    <button
                        className="link-button"
                        onClick={() => navigate('/register')}
                    >
                        Register here
                    </button>
                </p>
            )}
        </div>
    );
};

export default LoginPage;
