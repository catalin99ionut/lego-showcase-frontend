import React from 'react';
import { Link } from 'react-router-dom';

import '../styles.css';

const HomePage = () => {
    return (
        <div className="page-container">
            <h2 className="page-title">Welcome to your Lego collection!</h2>
            <p style={{ textAlign: 'center' }}>Select an option below:</p>
            <div className="menu">
                <Link to="/home" className="menu-link">Home</Link>
                <Link to="/my-lego-sets" className="menu-link">Your Lego Sets</Link>
                <Link to="/add-set" className="menu-link">Add New Set</Link>
            </div>
        </div>
    );
};

export default HomePage;
