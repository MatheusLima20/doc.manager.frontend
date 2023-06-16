import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../screens/home';
import { Footer } from '../includes/footer';
import { Header } from '../includes/head';

export const SystemRoutes = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="*" element={Home()} />
            </Routes>
            <Footer />
        </>
    );
};
