import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";
import { getMyLegoSets } from "../services/LegoSetService";

import '../styles.css';

const MyLegoSetsPage = () => {
    const {user} = useContext(AuthContext);
    const [legoSets, setLegoSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLegoSets = async () => {
            try {
                const sets = await getMyLegoSets();
                setLegoSets(sets);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLegoSets();
    }, []);

    if (loading) {
        return <div className="page-container">Loading your LEGO sets...</div>;
    }

    if (error) {
        return <div className="page-container"><p className="error">{error}</p></div>;
    }

    return (
        <div className="page-container">
            <h2 className="page-title">Your Lego Collection</h2>

            {legoSets.length === 0 ? (
                <div style={{textAlign: "center", marginTop: "50px"}}>
                    <p>You haven't added any LEGO sets yet.</p>
                    <button
                        className="primary-button"
                        onClick={() => window.location.href = '/add-set'}
                    >
                        Add Your First Set
                    </button>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px"
                }}>
                    {legoSets.map((set) => (
                        <div key={set.setId} style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "15px",
                            backgroundColor: "#f9f9f9"
                        }}>
                            {set.imageUrl && (
                                <img
                                    src={set.imageUrl}
                                    alt={set.name}
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: "5px",
                                        marginBottom: "10px"
                                    }}
                                />
                            )}
                            <h3>{set.name}</h3>
                            <p><strong>Set Number:</strong> {set.setNumber}</p>
                            <p><strong>Collection:</strong> {set.collection}</p>
                            <p><strong>Pieces:</strong> {set.pieceCount}</p>
                            <p><strong>Year:</strong> {set.year}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyLegoSetsPage;
