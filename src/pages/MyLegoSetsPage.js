import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";

import { getLegoSetsByUser } from '../services/LegoSetService';

import '../styles.css';

const MyLegoSetsPage = () => {
    const { user } = useContext(AuthContext);
    const [legoSets, setLegoSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { id } = user;
                const data = await getLegoSetsByUser(id);
                setLegoSets(data);
            } catch (error) {
                setError("Failed to fetch Lego sets");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    return (
        <div className="page-container">
            <h2 className="page-title">Your Lego Collection</h2>

            {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <>
                    {legoSets.length === 0 ? (
                        <p style={{ textAlign: 'center' }}>You have no Lego sets yet.</p>
                    ) : (
                        <ul className="lego-set-list">
                            {legoSets.map((set) => (
                                <li key={set.setId} className="lego-set-item">
                                    <h3>{set.name}</h3>
                                    <p>Collection: {set.collection}</p>
                                    <p>Pieces: {set.pieceCount}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default MyLegoSetsPage;
