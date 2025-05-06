import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LegoSetList from './components/LegoSetList';
import LegoSetForm from './components/LegoSetForm';
import Home from './components/Home';

const App = () => {
    return (
        <Router>
            <div>
                {/* Navigation Links */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/legosets">Lego Sets</Link>
                        </li>
                    </ul>
                </nav>

                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/legosets" element={<LegoSetList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
