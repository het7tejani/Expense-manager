import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import SummaryCard from '../components/Dashboard/SummaryCard';
import SuggestionPanel from '../components/Dashboard/SuggestionPanel';
import FinancialChart from '../components/Dashboard/FinancialChart';

const Dashboard = () => {
    const { transactions } = useAppContext();

    const { totalIn, totalOut, net } = useMemo(() => {
        return transactions.reduce((acc, t) => {
            if (t.type === 'in') acc.totalIn += t.totalAmount;
            else acc.totalOut += t.totalAmount;
            acc.net = acc.totalIn - acc.totalOut;
            return acc;
        }, { totalIn: 0, totalOut: 0, net: 0 });
    }, [transactions]);

    return (
        <section id="dashboard-view" className="view active-view" aria-labelledby="nav-dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-summary">
                <SummaryCard title="Total Cash In" value={totalIn} color="#2ecc71" />
                <SummaryCard title="Total Cash Out" value={totalOut} color="#e74c3c" />
                <SummaryCard
                    title="Net Profit/Loss"
                    value={net}
                    color={net < 0 ? '#e74c3c' : '#2ecc71'}
                    borderColor={net < 0 ? '#e74c3c' : '#2ecc71'}
                />
            </div>

            <FinancialChart totalIn={totalIn} totalOut={totalOut} />

            <SuggestionPanel netProfit={net} />
        </section>
    );
};

export default Dashboard;