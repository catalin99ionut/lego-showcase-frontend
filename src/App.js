import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { getCurrentUser, logout as logoutAPI } from './services/AuthService';

// Import pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import MyLegoSetsPage from './pages/MyLegoSetsPage';
import AddLegoSetPage from './pages/AddLegoSetPage';

import './App.css';

export const AuthContext = createContext();

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = await getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (error ) {
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (userData) => {
        setUser(userData);
    }

    const logout = async () => {
        try {
            await logoutAPI();
        } catch (error) {
        } finally {
            setUser(null);
        }
    };

    const PrivateRoute = ({children}) => {
        return user ? children : <Navigate to="/login"/>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            <Router>
                {user && (
                    <nav style={{padding: '10px', backgroundColor: '#eee'}}>
                        <Link to="/home" style={{marginRight: '15px'}}>Home</Link>
                        <Link to="/my-lego-sets" style={{marginRight: '15px'}}>Your Lego Sets</Link>
                        <Link to="/add-set" style={{marginRight: '15px'}}>Add Set</Link>
                        <button onClick={logout}>Logout</button>
                    </nav>
                )}

                <Routes>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage/>}/>

                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <HomePage/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/my-lego-sets"
                        element={
                            <PrivateRoute>
                                <MyLegoSetsPage/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/add-set"
                        element={
                            <PrivateRoute>
                                <AddLegoSetPage/>
                            </PrivateRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/login" />}/>
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
