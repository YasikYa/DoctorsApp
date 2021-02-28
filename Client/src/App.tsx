import { Suspense, Fragment } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import { RouteInfo, routes } from 'routes';
import { PrivateRoute } from 'routes/PrivateRoute';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

const RouteWithTitle = (props: RouteInfo) => (
    <Fragment>
        <Helmet>
            <title>{props.title}</title>
        </Helmet>

        {props.protected ? <PrivateRoute {...props} /> : <Route {...props} />}
    </Fragment>
);

export const App = () => {
    return (
        <div className="app">
            <Header />

            <main className="app__main">
                <Suspense fallback={null}>
                    <Switch>
                        {routes.map((route, index) => (
                            <RouteWithTitle {...route} key={index} />
                        ))}
                    </Switch>
                </Suspense>
            </main>

            <Footer />
        </div>
    );
};
