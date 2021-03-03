import { Suspense, useEffect } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import { RouteInfo } from 'routes';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { useDispatch, useSelector } from 'store';
import { fethMyself } from 'store/auth/actions';
import { useRoutes } from 'routes/useRoutes';
// import BarLoader from 'react-spinners/BarLoader';
// import { css } from '@emotion/core';

// const override = css`
//     position: fixed;
//     left: 0;
//     top: 0;
//     right: 0;
//     width: 100vw;
//     background-color: transparent;
// `;

const RouteWithTitle = (props: RouteInfo) => (
    <>
        <Helmet>
            <title>{props.title}</title>
        </Helmet>

        <Route {...props} />
    </>
);

export const App = () => {
    const dispatch = useDispatch();
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);

    const { routes } = useRoutes();

    useEffect(() => {
        isAuthorized && dispatch(fethMyself());
    }, [dispatch, isAuthorized]);

    return (
        <div className="app">
            {/* <BarLoader loading={true} css={override} color="#9a6ff5" /> */}

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
