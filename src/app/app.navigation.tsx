import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/routes';
import { UserDataLogged } from './types/user/user';

interface Props {
    dataUser: UserDataLogged;
}

export const AppNavigation = (props: Props) => {
    return (
        <Router>
            <AppRoutes dataUser={props.dataUser} />
        </Router>
    );
};
