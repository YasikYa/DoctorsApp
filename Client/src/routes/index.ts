import { lazy } from 'react';
import { paths } from './paths';

const HomePage = lazy(() => import('pages/Home'));
const NonExistentPage = lazy(() => import('pages/NonExistent'));

export interface RouteInfo {
    path: string | string[];
    exact?: boolean;
    title: string;
    component: any;
    protected?: boolean;
    onlyForAdmin?: boolean;
}

export const routes: RouteInfo[] = [
    {
        path: paths.HOME,
        exact: true,
        component: HomePage,
        title: 'Home',
    },
    {
        path: paths.NON_EXISTENT_PAGE,
        component: NonExistentPage,
        title: 'Non existent page',
    },
];
