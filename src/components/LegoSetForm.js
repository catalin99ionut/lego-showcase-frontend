import React, { useState } from 'react';
import axios from 'axios';

const LegoSetForm = () => {
    const [legoId, setLegoId] = useState('');
    const [name, setName] = useState('');
    const [collection, setCollection] = useState('');
    const [pieceCount, setPieceCount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newLegoSet = {
            legoId,
            name,
            collection,
            pieceCount
        };

        try {
            await axios.post('http://localhost:8080/legosets', newLegoSet);
            alert('Lego set added successfully!');
        } catch (error) {
            console.error('Error adding Lego set: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Lego ID" onChange={e => setLegoId(e.target.value)} required />
            <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} required />
            <input type="text" placeholder="Collection" onChange={e => setCollection(e.target.value)} required />
            <input type="number" placeholder="Piece Count" onChange={e => setPieceCount(e.target.value)} required />
            <button type="submit">Add Lego Set</button>
        </form>
    );
};

export default LegoSetForm;
