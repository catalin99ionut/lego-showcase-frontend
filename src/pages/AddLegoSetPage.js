import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addLegoSet } from '../services/LegoSetService';

import '../styles.css';

const AddLegoSetPage = () => {
    const [name, setName] = useState('');
    const [collection, setCollection] = useState('');
    const [pieceCount, setPieceCount] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !collection || !pieceCount) {
            setError('Please fill all fields.');
            return;
        }

        if (isNaN(pieceCount) || pieceCount <= 0) {
            setError('Piece count must be a positive number.');
            return;
        }

        try {
            const newSet = {
                name,
                collection,
                pieceCount: Number(pieceCount),
            };

            await addLegoSet(newSet);
            setSuccess('Lego Set added successfully!');

            setName('');
            setCollection('');
            setPieceCount('');
        } catch (error) {
            setError("Failed to add Lego Set. Please try again.");
        }
    };

    return (
        <div className="page-container">
            <h2 className="page-title">Add Lego Set</h2>

            {error && <p className="error">{error}</p>}
            {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

            <form className="add-set-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="collection">Collection:</label>
                    <input
                        id="collection"
                        type="text"
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pieceCount">Piece Count:</label>
                    <input
                        id="pieceCount"
                        type="number"
                        value={pieceCount}
                        onChange={(e) => setPieceCount(e.target.value)}
                        required
                        min="1"
                        className="form-input"
                    />
                </div>
                <button type="submit" className="primary-button">Add Set</button>
            </form>
        </div>
    );
};

export default AddLegoSetPage;
