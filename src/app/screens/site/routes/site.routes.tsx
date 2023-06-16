import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../screens/home';
import { PlatformRegistration } from '../screens/platoform.registration';

export const SiteRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Home />} />
                <Route
                    path="/platform-register"
                    element={<PlatformRegistration />}
                />
            </Routes>
        </>
    );
};
