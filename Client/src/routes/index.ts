import { lazy } from 'react';
import { paths } from './paths';

const HomePage = lazy(() => import('pages/Home'));
const LoginPage = lazy(() => import('pages/auth/LoginPage'));
const SignUpPage = lazy(() => import('pages/auth/SignUpPage'));
const NonExistentPage = lazy(() => import('pages/NonExistent'));

export interface RouteInfo {
    path: string | string[];
    exact?: boolean;
    title: string;
    component: any;
    protected?: boolean;
}

export const routes: RouteInfo[] = [
    {
        path: paths.HOME,
        exact: true,
        component: HomePage,
        title: 'Home',
    },
    {
        path: paths.LOGIN,
        exact: true,
        component: LoginPage,
        title: 'Login',
    },
    {
        path: paths.SIGN_UP,
        exact: true,
        component: SignUpPage,
        title: 'Sign up',
    },
    {
        path: paths.NON_EXISTENT_PAGE,
        component: NonExistentPage,
        title: 'Non existent page',
    },
];
