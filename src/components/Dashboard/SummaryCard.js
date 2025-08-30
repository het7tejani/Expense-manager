import React from 'react';
import { formatCurrency } from '../../utils/helpers';

const SummaryCard = ({ title, value, color, borderColor }) => {
    return (
        <div className="summary-card" style={{ borderColor: borderColor || 'transparent' }}>
            <h3>{title}</h3>
            <p aria-live="polite" style={{ color }}>{formatCurrency(value)}</p>
        </div>
    );
};

export default SummaryCard;