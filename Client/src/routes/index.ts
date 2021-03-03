import { UserRole } from 'api/auth/types';
import { lazy, ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { paths } from './paths';

const HomePage = lazy(() => import('pages/Home'));
const LoginPage = lazy(() => import('pages/auth/LoginPage'));
const SignUpPage = lazy(() => import('pages/auth/SignUpPage'));
const NonExistentPage = lazy(() => import('pages/NonExistent'));
const AdminDoctorsPage = lazy(() => import('pages/admin/AdminPage'));

export interface RouteInfo {
    path: string | string[];
    exact?: boolean;
    title: string;
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
    availableOnlyFor?: UserRole;
}

export const routes: RouteInfo[] = [
    {
        path: paths.ADMIN_PANEL,
        exact: false,
        component: AdminDoctorsPage,
        title: 'Админская панель',
        availableOnlyFor: 'Admin',
    },
    {
        path: paths.LOGIN,
        exact: true,
        component: LoginPage,
        title: 'Авторизация',
    },
    {
        path: paths.SIGN_UP,
        exact: true,
        component: SignUpPage,
        title: 'Регистрация',
    },
    {
        path: paths.HOME,
        exact: true,
        component: HomePage,
        title: 'Главная',
    },
    {
        path: paths.NON_EXISTENT_PAGE,
        component: NonExistentPage,
        title: 'Такой страницы не существует',
    },
];
