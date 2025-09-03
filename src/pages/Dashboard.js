import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import SummaryCard from '../components/Dashboard/SummaryCard';
import SuggestionPanel from '../components/Dashboard/SuggestionPanel';
import FinancialChart from '../components/Dashboard/FinancialChart';
import FirmDistributionChart from '../components/Dashboard/FirmDistributionChart';
import GstSummaryTable from '../components/Dashboard/GstSummaryTable';


const Dashboard = () => {
    const { firms, transactions } = useAppContext();

    const { totalIn, totalOut, net } = useMemo(() => {
        return transactions.reduce((acc, t) => {
            if (t.type === 'in') {
                acc.totalIn += t.totalAmount;
            } else {
                acc.totalOut += t.totalAmount;
            }
            acc.net = acc.totalIn - acc.totalOut;
            return acc;
        }, { totalIn: 0, totalOut: 0, net: 0 });
    }, [transactions]);

    const gstByGstin = useMemo(() => {
        if (!firms.length || !transactions.length) return [];

        const gstSummary = {}; // Key will be GSTIN

        const firmsById = firms.reduce((acc, firm) => {
            acc[firm.id] = firm;
            return acc;
        }, {});

        transactions.forEach(t => {
            const firm = firmsById[t.firmId];
            if (!firm) return;

            const { gstNumber, name } = firm;

            if (!gstSummary[gstNumber]) {
                gstSummary[gstNumber] = {
                    gstNumber: gstNumber,
                    firmNames: new Set(),
                    outputGst: 0,
                    inputGst: 0,
                };
            }

            gstSummary[gstNumber].firmNames.add(name);

            if (t.type === 'in') {
                gstSummary[gstNumber].outputGst += t.gstAmount;
            } else {
                gstSummary[gstNumber].inputGst += t.gstAmount;
            }
        });

        return Object.values(gstSummary)
            .map(summary => ({
                firmName: Array.from(summary.firmNames).join(', '),
                gstNumber: summary.gstNumber,
                outputGst: summary.outputGst,
                inputGst: summary.inputGst,
                netPayableGst: summary.outputGst - summary.inputGst,
            }))
            .filter(s => s.outputGst > 0 || s.inputGst > 0);
    }, [firms, transactions]);


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

            <GstSummaryTable data={gstByGstin} />

            <div className="dashboard-charts-grid">
                <FinancialChart totalIn={totalIn} totalOut={totalOut} />
                <FirmDistributionChart transactions={transactions} />
            </div>

            <SuggestionPanel netProfit={net} />
        </section>
    );
};

export default Dashboard;