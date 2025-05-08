import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LegoSet from './LegoSet';

const LegoSetsPage = () => {
    const [legoSets, setLegoSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLegoSets = async () => {
            try {
                const response = await axios.get('http://localhost:8080/legosets');
                setLegoSets(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchLegoSets();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Lego Sets</h1>
            <ul>
                {legoSets.map(legoSet => (
                    <LegoSet key={legoSet.id} legoSet={legoSet} />
                ))}
            </ul>
        </div>
    );
};

export default LegoSetsPage;
