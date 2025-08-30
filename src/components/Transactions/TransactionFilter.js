import React from 'react';

const TransactionFilter = ({ firms, selectedFirm, onFilterChange }) => {
    return (
        <div className="form-field-full" style={{ maxWidth: '400px', marginBottom: '1.5rem' }}>
            <label htmlFor="filter-firm-history">Filter by Firm:</label>
            <select
                id="filter-firm-history"
                name="filter-firm-history"
                value={selectedFirm}
                onChange={e => onFilterChange(e.target.value)}
            >
                <option value="all">All Firms</option>
                {firms.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
        </div>
    );
};

export default TransactionFilter;