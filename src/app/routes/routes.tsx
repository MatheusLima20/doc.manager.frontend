import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SiteNavigation } from '../screens/site/site.navigation';
import { UserDataLogged } from '../types/user/user';
import { SystemNavigation } from '../screens/system/system.navigation';

interface Props {
    dataUser: UserDataLogged;
}

export const AppRoutes = (props: Props) => {
    return isLogged();

    function isLogged() {
        const token = props.dataUser.token;

        const isLogged = token.length !== 0;

        if (isLogged) {
            return (
                <Routes>
                    <Route path="*" element={SystemNavigation()} />
                </Routes>
            );
        }

        return (
            <Routes>
                <Route path="*" element={SiteNavigation()} />
            </Routes>
        );
    }
};
