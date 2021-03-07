import { Container } from 'shared/components/Container';
import { NavLink } from 'react-router-dom';
import { paths } from 'routes/paths';
import { LogoutButton } from './LogoutButton';
import styled from 'styled-components';
import { useSelector } from 'store';
import { Logotype } from 'components/Logotype';

const HeaderUnstyled = ({ className }: { className?: string }) => {
    const { isAuthorized, userInfo } = useSelector((state) => ({
        isAuthorized: state.auth.isAuthorized,
        userInfo: state.auth.userInfo,
    }));

    return (
        <header className={className}>
            <Container className="header-inner">
                <Logotype />

                <ul>
                    <li>
                        <NavLink to={paths.DOCTORS}>Врачи</NavLink>
                    </li>
                    {!isAuthorized && (
                        <li>
                            <NavLink to={paths.LOGIN}>Авторизация</NavLink>
                        </li>
                    )}
                    {!isAuthorized && (
                        <li>
                            <NavLink to={paths.SIGN_UP}>Регистрация</NavLink>
                        </li>
                    )}
                    {isAuthorized && userInfo?.role === 'Admin' && (
                        <li>
                            <NavLink to={paths.ADMIN_PANEL}>Админская панель</NavLink>
                        </li>
                    )}
                    {isAuthorized && userInfo?.role !== 'Admin' && (
                        <li>
                            <NavLink to={paths.RECORDS}>Записи на приём</NavLink>
                        </li>
                    )}
                </ul>

                {isAuthorized && <LogoutButton />}
            </Container>
        </header>
    );
};

export const Header = styled(HeaderUnstyled)`
    position: relative;
    z-index: 2;
    box-shadow: 0px 0px 8px 4px rgba(34, 60, 80, 0.04);
    min-height: 60px;
    display: flex;

    .header-inner {
        display: flex;
        align-items: center;
    }

    ul {
        display: flex;
        align-items: center;
        margin: 0;
        margin-inline-start: 20px;

        a {
            position: relative;
            display: flex;
            padding: 2rem 2.5rem;
            color: #1890ff;
            font-weight: 500;

            a:hover {
                color: #40a9ff !important;
            }

            &::after {
                position: absolute;
                content: '';
                left: 0;
                right: 0;
                bottom: 0;
                height: 4px;
                transition: background-color 200ms ease-in-out;
            }

            &.active::after {
                background-color: currentColor;
            }
        }
    }

    button {
        margin-inline-start: auto;
    }
`;
