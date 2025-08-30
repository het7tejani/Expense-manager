import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => (
    <>
        <Header />
        <main id="app-content">
            <Outlet />
        </main>
        <Footer />
    </>
);

export default Layout;