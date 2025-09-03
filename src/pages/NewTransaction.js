import React, { useState, useMemo, useEffect } from 'react';
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
    const [itemCategory, setItemCategory] = useState('');
    const [overrideGst, setOverrideGst] = useState('');

    useEffect(() => {
        // Reset expense-specific fields when type changes
        setItemCategory('');
        setOverrideGst('');
    }, [type]);

    const gstPreviewDetails = useMemo(() => {
        if (!firmId || !amount || amount <= 0) return null;
        const firm = firms.find(f => f.id === firmId);
        if (!firm) return null;

        const enteredAmount = parseFloat(amount);
        const gstPercentage = (type === 'out' && overrideGst) ? parseFloat(overrideGst) : firm.gstPercentage;
        
        if (isNaN(gstPercentage)) return null; // Don't calculate if override is not a valid number

        const gstRate = gstPercentage / 100;
        let baseAmount, gstAmount, totalAmount;

        if (type === 'in') {
            totalAmount = enteredAmount;
            baseAmount = totalAmount / (1 + gstRate);
            gstAmount = totalAmount - baseAmount;
        } else { // 'out'
            baseAmount = enteredAmount;
            gstAmount = baseAmount * gstRate;
            totalAmount = baseAmount + gstAmount;
        }

        return {
            baseAmount, gstAmount, totalAmount,
            gstPercentage,
            baseLabel: type === 'in' ? 'Base Value (Calculated)' : 'Purchase Value (Entered)',
            totalLabel: type === 'in' ? 'Total Invoice Value (Entered)' : 'Total Payable Amount (Calculated)'
        };
    }, [firmId, amount, type, firms, overrideGst]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firmId || !partyName || !amount || amount <= 0 || !gstPreviewDetails) {
            alert('Please fill in all transaction details correctly.');
            return;
        }
        if (type === 'out' && !itemCategory) {
            alert('Please enter an item category for the expense.');
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
            date: new Date().toISOString(),
            itemCategory: type === 'out' ? itemCategory : null,
            gstPercentage: gstPreviewDetails.gstPercentage,
            isGstOverridden: type === 'out' && overrideGst !== '',
        };

        addTransaction(newTransaction);
        alert('Transaction recorded successfully!');
        navigate('/transaction-history');
    };

    const amountLabel = type === 'in'
        ? 'Total Amount (Inclusive of GST)'
        : 'Base Amount (Exclusive of GST)';
    
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

                    {type === 'out' && (
                         <div className="form-row">
                            <div className="form-field">
                                <label htmlFor="item-category">Item Category</label>
                                <input type="text" id="item-category" name="item-category" required={type === 'out'} placeholder="e.g., Office Supplies" value={itemCategory} onChange={e => setItemCategory(e.target.value)} />
                            </div>
                            <div className="form-field">
                                <label htmlFor="override-gst">GST Percentage (%) <small>(Optional)</small></label>
                                <input type="number" id="override-gst" name="override-gst" min="0" max="100" step="0.01" placeholder={`Default: ${firms.find(f=>f.id === firmId)?.gstPercentage || 'N/A'}%`} value={overrideGst} onChange={e => setOverrideGst(e.target.value)} />
                            </div>
                        </div>
                    )}

                    <div className="form-field-full">
                        <label htmlFor="transaction-amount">{amountLabel}</label>
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