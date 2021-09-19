import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem("user") ?
            <Redirect to="/barang" />
        : <Component {...props} />
    )} />
)

export default PublicRoute;