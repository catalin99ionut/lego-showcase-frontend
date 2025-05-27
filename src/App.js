import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

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

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const PrivateRoute = ({children}) => {
        return user ? children : <Navigate to="/login"/>;
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
                    <Route path="/login" element={<LoginPage onLogin={login}/>}/>
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
