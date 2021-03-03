import { Container } from 'shared/components/Container';
import { NavLink } from 'react-router-dom';
import { paths } from 'routes/paths';
import { LogoutButton } from './LogoutButton';
import styled from 'styled-components';
import { useSelector } from 'store';
import { Logotype } from 'components/Logotype';

const HeaderUnstyled = ({ className }: { className?: string }) => {
    const { isAuthorized } = useSelector((state) => ({ isAuthorized: state.auth.isAuthorized }));

    return (
        <header className={className}>
            <Container className="header-inner">
                <Logotype />

                <ul>
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
                    {isAuthorized && (
                        <li>
                            <NavLink to={paths.ADMIN_PANEL}>Админская панель</NavLink>
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
    z-index: 1;
    box-shadow: -3px -7px 11px 0px rgb(0 0 0 / 75%);
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
            color: #9a6ff5;
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
