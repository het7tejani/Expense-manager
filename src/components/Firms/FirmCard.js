import React from 'react';

const FirmCard = ({ firm }) => {
    return (
        <div className="firm-card" key={firm.id}>
            <h4>{firm.name}</h4>
            <p><strong>GSTIN:</strong> {firm.gstNumber}</p>
            <p><strong>Category:</strong> {firm.category}</p>
            <p><strong>GST %:</strong> {firm.gstPercentage}%</p>
            {firm.description && <p><strong>Description:</strong> {firm.description}</p>}
        </div>
    );
};

export default FirmCard;