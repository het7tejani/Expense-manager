import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { generateId } from '../utils/helpers';
import GstPreview from '../components/Transactions/GstPreview';

const NewTransaction = () => {
    const { firms, addTransaction } = useAppContext();
    const navigate = useNavigate();
    const [type, setType] = useState('in');
    const [firmId, setFirmId] = useState('');
    const [partyName, setPartyName] = useState('');
    const [amount, setAmount] = useState('');

    const gstPreviewDetails = useMemo(() => {
        if (!firmId || !amount || amount <= 0) return null;
        const firm = firms.find(f => f.id === firmId);
        if (!firm) return null;

        const enteredAmount = parseFloat(amount);
        const gstRate = firm.gstPercentage / 100;
        let baseAmount, gstAmount, totalAmount;

        if (type === 'in') {
            totalAmount = enteredAmount;
            baseAmount = totalAmount / (1 + gstRate);
            gstAmount = totalAmount - baseAmount;
        } else {
            baseAmount = enteredAmount;
            gstAmount = baseAmount * gstRate;
            totalAmount = baseAmount + gstAmount;
        }

        return {
            baseAmount, gstAmount, totalAmount,
            gstPercentage: firm.gstPercentage,
            baseLabel: type === 'in' ? 'Base Amount (Calculated)' : 'Base Amount (As Entered)',
            totalLabel: type === 'in' ? 'Total Amount (As Entered)' : 'Total Amount (To Be Paid)'
        };
    }, [firmId, amount, type, firms]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firmId || !partyName || !amount || amount <= 0 || !gstPreviewDetails) {
            alert('Please fill in all transaction details correctly.');
            return;
        }
        const firm = firms.find(f => f.id === firmId);
        
        const newTransaction = {
            id: generateId(),
            firmId,
            firmName: firm.name,
            type,
            partyName,
            baseAmount: gstPreviewDetails.baseAmount,
            gstAmount: gstPreviewDetails.gstAmount,
            totalAmount: gstPreviewDetails.totalAmount,
            date: new Date().toISOString()
        };

        addTransaction(newTransaction);
        alert('Transaction recorded successfully!');
        navigate('/transaction-history');
    };
    
    return (
        <section id="new-transaction-view" className="view active-view" aria-labelledby="nav-new-transaction">
            <h2>Record New Transaction</h2>
            <div className="form-container">
                <form id="new-transaction-form" onSubmit={handleSubmit}>
                    <div className="form-field-full form-radio-group">
                        <legend>Transaction Type</legend>
                        <div className="radio-options-container">
                            <div className="form-radio-option">
                                <input type="radio" id="type-cash-in" name="transaction-type" value="in" required checked={type === 'in'} onChange={() => setType('in')} />
                                <label htmlFor="type-cash-in">Cash In</label>
                            </div>
                            <div className="form-radio-option">
                                <input type="radio" id="type-cash-out" name="transaction-type" value="out" checked={type === 'out'} onChange={() => setType('out')} />
                                <label htmlFor="type-cash-out">Cash Out</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="transaction-firm">Select Firm</label>
                            <select id="transaction-firm" name="transaction-firm" required value={firmId} onChange={e => setFirmId(e.target.value)}>
                                <option value="">--Select a Firm--</option>
                                {firms.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="party-name">Party Name (To/From)</label>
                            <input type="text" id="party-name" name="party-name" required value={partyName} onChange={e => setPartyName(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-field-full">
                        <label htmlFor="transaction-amount">Amount</label>
                        <input type="number" id="transaction-amount" name="transaction-amount" required min="0.01" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} />
                    </div>

                    <GstPreview details={gstPreviewDetails} />
                    
                    <button type="submit">Record Transaction</button>
                </form>
            </div>
        </section>
    );
};

export default NewTransaction;