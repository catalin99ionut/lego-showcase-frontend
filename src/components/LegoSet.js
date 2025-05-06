import React from 'react';


const LegoSet = ({ legoSet }) => {
    return (
        <li>
            <h2>{legoSet.name}</h2>
            <p>Collection: {legoSet.collection}</p>
            <p>Pieces: {legoSet.pieceCount}</p>
        </li>
    );
};

export default LegoSet;