import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <div className="header-container">
            <NavLink to="/" className="header-logo">📊 Expense Manager</NavLink>
            <nav>
                <ul>
                    <li><NavLink to="/" id="nav-dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/add-firm" id="nav-add-firm">Add Firm</NavLink></li>
                    <li><NavLink to="/your-firms" id="nav-your-firms">Your Firms</NavLink></li>
                    <li><NavLink to="/new-transaction" id="nav-new-transaction">New Transaction</NavLink></li>
                    <li><NavLink to="/transaction-history" id="nav-transaction-history">Transaction History</NavLink></li>
                </ul>
            </nav>
        </div>
    </header>
);

export default Header;