import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LegoSetsPage from './components/LegoSetsPage';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        setAuthenticated(isAuthenticated);
        setLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('username');
        setAuthenticated(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div className="app-container">
                {authenticated && (
                    <nav className="navbar">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/legosets">Lego Sets</Link>
                            </li>
                            <li className="logout-button">
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </nav>
                )}

                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute authenticated={authenticated}>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/legosets"
                        element={
                            <ProtectedRoute authenticated={authenticated}>
                                <LegoSetsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            authenticated ?
                                <Navigate to="/" /> :
                                <Login setAuthenticated={setAuthenticated} />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            authenticated ?
                                <Navigate to="/" /> :
                                <Register />
                        }
                    />
                    <Route
                        path="*"
                        element={authenticated ? <Navigate to="/" /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
