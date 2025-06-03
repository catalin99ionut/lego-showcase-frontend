import React, { useState } from 'react';

const LegoSetImageModal = ({ legoSet, isOpen, onClose, onImageUploaded }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [showFullImage, setShowFullImage] = useState(false);

    if (!isOpen) return null;

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setUploadError('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setUploadError('File size exceeds 5MB limit');
            return;
        }

        setIsUploading(true);
        setUploadError(null);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(`http://localhost:8080/lego-sets/${legoSet.setId}/upload-image`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Upload failed");
            }

            const result = await response.json();
            onImageUploaded(legoSet.setId, result.imageUrl);
        } catch (error) {
            setUploadError(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000
                }}
                onClick={handleBackdropClick}
            >
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "24px",
                    maxWidth: "500px",
                    width: "90%",
                    maxHeight: "80vh",
                    overflow: "auto",
                    position: "relative"
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            background: "none",
                            border: "none",
                            fontSize: "24px",
                            cursor: "pointer",
                            color: "#666",
                            padding: "4px"
                        }}
                    >
                        x
                    </button>

                    <h2 style={{ marginTop: 0, marginBottom: "20px", color: "#333" }}>
                        {legoSet.name}
                    </h2>
                    <p style={{ color: "#666", marginBotton: "20px" }}>
                        Set #{legoSet.setNumber} | {legoSet.collection} | {legoSet.year}
                    </p>

                    <div style={{ marginBottom: "20px" }}>
                        {legoSet.userImageUrl ? (
                            <div style={{ textAlign: "center" }}>
                                <img
                                    src={legoSet.userImageUrl}
                                    alt={legoSet.name}
                                    style={{
                                        maxWidth: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        border: "2px solid #ddd"
                                    }}
                                    onClick={() => setShowFullImage(true)}
                                />
                                <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
                                    Click image to view full size
                                </p>
                            </div>
                        ) : (
                            <div style={{
                                height: "200px",
                                backgroundColor: "#f5f5f5",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "2px dashed #ddd",
                                color: "#666"
                            }}>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "48px", marginTop: "10px" }}>?</div>
                                    <p>No image uploaded yet</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {uploadError && (
                        <div style={{
                            backgroundColor: "#fee",
                            color: "#c33",
                            padding: "12px",
                            borderRadius: "6px",
                            marginBottom: "16px",
                            fontSize: "14px"
                        }}>
                            {uploadError}
                        </div>
                    )}

                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        <label style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "10px 16px",
                            borderRadius: "6px",
                            cursor: isUploading ? "not-allowed" : "pointer",
                            border: "none",
                            fontSize: "14px",
                            opacity: isUploading ? 0.6 : 1,
                            flex: 1,
                            textAlign: "center"
                        }}>
                            {isUploading ? "Uploading..." : (legoSet.userImageUrl ? "Replace Image" : "Upload Image")}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={isUploading}
                                style={{ display: "none" }}
                            />
                        </label>

                        {legoSet.userImageUrl && (
                            <button
                                onClick={() => setShowFullImage(true)}
                                style={{
                                    backgroundColor: "#28a745",
                                    color: "white",
                                    padding: "10px 16px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    border: "none",
                                    fontSize: "14px",
                                    flex: 1,
                                }}
                            >
                                View Full Size
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {showFullImage && legoSet.userImageUrl && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1001
                    }}
                    onClick={() => setShowFullImage(false)}
                >
                    <div style={{ position: "relative", maxWidth: "90%", maxHeight: "90%" }}>
                        <button
                            onClick={() => setShowFullImage(false)}
                            style={{
                                position: "absolute",
                                top: "-40px",
                                right: "0px",
                                background: "rgba(255, 255, 255, 0.9)",
                                border: "none",
                                borderRadius: "50%",
                                width: "36px",
                                height: "36px",
                                fontSize: "18px",
                                cursor: "pointer",
                                color: "#333"
                            }}
                        >
                            x
                        </button>
                        <img
                            src={legoSet.userImageUrl}
                            alt={legoSet.name}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                borderRadius: "8px"
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default LegoSetImageModal;