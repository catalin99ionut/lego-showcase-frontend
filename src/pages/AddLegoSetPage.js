import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addLegoSetByNumber } from '../services/LegoSetService';

import '../styles.css';

const AddLegoSetPage = () => {
    const [setNumber, setSetNumber] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        if (success) setSuccess(null);
        if (error) setError(null);
        if (previewData) setPreviewData(previewData);
        setSetNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!setNumber.trim()) {
            setError('Please enter a valid Lego set number.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const addedSet = await addLegoSetByNumber(setNumber.trim());
            setPreviewData(addedSet);
            setSuccess('Lego Set added successfully! You can now view it in your collection.');
            setSetNumber('');

            setTimeout(() => {
                navigate('/my-lego-sets');
            }, 3000);
        } catch (error) {
            setError("Failed to add Lego Set. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-container">
            <h2 className="page-title">Add LEGO Set</h2>

            {error && <p className="error">{error}</p>}
            {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

            <form className="add-set-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="setNumber">LEGO Set Number:</label>
                    <input
                        id="setNumber"
                        type="text"
                        value={setNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., 75192"
                        required
                        className="form-input"
                        disabled={isLoading}
                    />
                    <small style={{ color: '#666', fontSize: '0.9em' }}>
                        Enter the official LEGO set number (found on the box)
                    </small>
                </div>

                <button type="submit" className="primary-button" disabled={isLoading}>
                    {isLoading ? 'Validating & Adding...' : 'Add Set'}
                </button>
            </form>

            {previewData && (
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <h3>Added to Your Collection:</h3>
                    <p><strong>Set Number:</strong> {previewData.setNumber}</p>
                    <p><strong>Name:</strong> {previewData.name}</p>
                    <p><strong>Collection:</strong> {previewData.collection}</p>
                    <p><strong>Pieces:</strong> {previewData.pieceCount}</p>
                    <p><strong>Year:</strong> {previewData.year}</p>
                    {previewData.imageUrl && (
                        <img
                            src={previewData.imageUrl}
                            alt={previewData.name}
                            style={{ maxWidth: '200px', height: 'auto'}}
                        />
                    )}
                </div>
            )}

            {!isLoading && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() => navigate('/my-lego-sets')}
                    >
                        Back to Your Collection
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddLegoSetPage;
