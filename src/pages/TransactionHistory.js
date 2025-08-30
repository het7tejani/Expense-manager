import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import TransactionFilter from '../components/Transactions/TransactionFilter';
import TransactionTable from '../components/Transactions/TransactionTable';

const TransactionHistory = () => {
    const { firms, transactions } = useAppContext();
    const [filterFirmId, setFilterFirmId] = useState('all');

    const handleFilterChange = (firmId) => {
        setFilterFirmId(firmId);
    };

    const filteredTransactions = useMemo(() => {
        const filtered = filterFirmId === 'all'
            ? transactions
            : transactions.filter(t => t.firmId === filterFirmId);
        return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [transactions, filterFirmId]);

    return (
        <section id="transaction-history-view" className="view active-view" aria-labelledby="nav-transaction-history">
            <h2>Transaction History</h2>
            <TransactionFilter
                firms={firms}
                selectedFirm={filterFirmId}
                onFilterChange={handleFilterChange}
            />
            <TransactionTable
                transactions={filteredTransactions}
                filterActive={filterFirmId !== 'all'}
            />
        </section>
    );
};

export default TransactionHistory;