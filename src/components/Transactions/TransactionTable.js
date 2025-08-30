import React from 'react';
import { formatDate, formatCurrency } from '../../utils/helpers';

const TransactionTable = ({ transactions, filterActive }) => {
    return (
        <div className="table-container">
            <table id="transaction-history-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Firm Name</th>
                        <th>Type</th>
                        <th>Party Name</th>
                        <th>Base Amount</th>
                        <th>GST Amount</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? transactions.map(t => (
                        <tr key={t.id}>
                            <td>{formatDate(t.date)}</td>
                            <td>{t.firmName}</td>
                            <td style={{ color: t.type === 'in' ? '#2ecc71' : '#e74c3c' }}>
                                {t.type === 'in' ? 'Cash In' : 'Cash Out'}
                            </td>
                            <td>{t.partyName}</td>
                            <td>{formatCurrency(t.baseAmount)}</td>
                            <td>{formatCurrency(t.gstAmount)}</td>
                            <td>{formatCurrency(t.totalAmount)}</td>
                        </tr>
                    )) : (
                        <tr><td colSpan="7">No transactions yet{filterActive ? ' for this firm' : ''}.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;