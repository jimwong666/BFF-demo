import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '@components/layout/main/index';

const renderRoutes = (routes, extraProps = {}, switchProps = {}) => routes ? (
    <Switch {...switchProps}>
        {routes.map((route, i) => (
            <Route
                key={route.key || i}
                path={route.path}
                exact={route.exact}
                strict={route.strict}
                render={(props) => {
                    return <Main breadcrumbs={route.breadcrumb} active={route.active} text={<route.component {...props} {...extraProps} route={route} />}></Main>
                }}
            />
        ))}
    </Switch>
) : null;

export default renderRoutes;