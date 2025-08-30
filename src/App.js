import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AddFirm from './pages/Addfirm';
import YourFirms from './pages/YourFirms';
import NewTransaction from './pages/NewTransaction';
import TransactionHistory from './pages/TransactionHistory';

const App = () => {
    return (
        <BrowserRouter>
            <AppProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="add-firm" element={<AddFirm />} />
                        <Route path="your-firms" element={<YourFirms />} />
                        <Route path="new-transaction" element={<NewTransaction />} />
                        <Route path="transaction-history" element={<TransactionHistory />} />
                    </Route>
                </Routes>
            </AppProvider>
        </BrowserRouter>
    );
};

export default App;