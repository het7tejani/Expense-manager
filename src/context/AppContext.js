import React, { useState, useEffect, createContext, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [firms, setFirms] = useState(() => JSON.parse(localStorage.getItem('firms')) || []);
    const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('transactions')) || []);

    useEffect(() => {
        localStorage.setItem('firms', JSON.stringify(firms));
    }, [firms]);

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const addFirm = (firm) => {
        setFirms(prev => [...prev, firm]);
    };

    const addTransaction = (transaction) => {
        setTransactions(prev => [...prev, transaction]);
    };

    const resetAllData = () => {
        if (window.confirm('Are you sure you want to reset all application data? This action cannot be undone.')) {
            setFirms([]);
            setTransactions([]);
            localStorage.removeItem('firms');
            localStorage.removeItem('transactions');
            alert('All application data has been reset.');
        }
    };

    return (
        <AppContext.Provider value={{ firms, transactions, addFirm, addTransaction, resetAllData }}>
            {children}
        </AppContext.Provider>
    );
};