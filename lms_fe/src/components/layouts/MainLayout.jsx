// src/components/layouts/MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <>
            <Header />
            
            <main>
                <Outlet /> {/* Renders the content of the child route */}
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;