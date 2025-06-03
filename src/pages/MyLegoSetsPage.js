import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";
import { getMyLegoSets } from "../services/LegoSetService";
import LegoSetImageModal from "../components/LegoSetImageModal";

import '../styles.css';

const MyLegoSetsPage = () => {
    const {user} = useContext(AuthContext);
    const [legoSets, setLegoSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSet, setSelectedSet] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleImageUploaded = (setId, newImageUrl) => {
        setLegoSets(prevSets =>
            prevSets.map(set =>
                set.setId === setId ? {...set, userImageUrl: newImageUrl} : set
            )
        );
    };

    const openImageModal = (legoSet) => {
        setSelectedSet(legoSet);
        setIsModalOpen(true);
    };

    const closeImageModal = () => {
        setIsModalOpen(false);
        setSelectedSet(null);
    }

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
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: "20px"
                }}>
                    {legoSets.map((set) => (
                        <div key={set.setId} style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "15px",
                            backgroundColor: "#f9f9f9",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            cursor: "pointer"
                        }}
                             onMouseEnter={(e) => {
                                 e.currentTarget.style.transform = "translateY(-2px)";
                                 e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                             }}
                             onMouseLeave={(e) => {
                                 e.currentTarget.style.transform = "translateY(0)";
                                 e.currentTarget.style.boxShadow = "none";
                             }}>
                            <div style={{position: "relative", marginBottom: "12px"}}>
                                {set.userImageUrl ? (
                                    <img
                                        src={set.userImageUrl}
                                        alt={set.name}
                                        style={{
                                            width: "100%",
                                            height: "180px",
                                            objectFit: "cover",
                                            borderRadius: "8px"
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        width: "100%",
                                        height: "180px",
                                        backgroundColor: "#e8e8e8",
                                        borderRadius: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#666",
                                        fontSize: "14px",
                                        border: "2px dashed #ccc"
                                    }}>
                                        <div style={{textAlign: "center"}}>
                                            <div style={{fontSize: "36px", marginBottom: "8px"}}>?</div>
                                            <div>No image</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <h3 style={{margin: "0 0 8px 0", fontSize: "16px"}}>{set.name}</h3>
                            <p style={{margin: "4px 0", fontSize: "14px", color: "#666"}}>
                                <strong>Set:</strong> {set.setNumber}
                            </p>
                            <p style={{margin: "4px 0", fontSize: "14px", color: "#666"}}>
                                <strong>Collection:</strong> {set.collection}
                            </p>
                            <p style={{margin: "4px 0", fontSize: "14px", color: "#666"}}>
                                <strong>Pieces:</strong> {set.pieceCount} | <strong>Year:</strong> {set.year}
                            </p>

                            <button
                                onClick={() => openImageModal(set)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "12px",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    transition: "background-color 0.2s"
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
                                onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
                            >
                                ? Manage Image
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedSet && (
                <LegoSetImageModal
                    legoSet={selectedSet}
                    isOpen={isModalOpen}
                    onClose={closeImageModal}
                    onImageUploaded={handleImageUploaded}
                />
            )}
        </div>
    );
};

export default MyLegoSetsPage;
