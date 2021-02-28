import { Container } from 'shared/components/Container';
import { Link } from 'react-router-dom';
import { paths } from 'routes/paths';
import { tokenService } from 'services/TokenService';
import { LogoutButton } from './LogoutButton';
import styled from 'styled-components';
import { useSelector } from 'store';

const HeaderUnstyled = ({ className }: { className?: string }) => {
    const { isAuthorized } = useSelector((state) => ({ isAuthorized: state.auth.isAuthorized }));

    return (
        <header className={className}>
            <Container>
                <ul>
                    <li>
                        <Link to={paths.HOME}>Home</Link>
                    </li>
                    {!isAuthorized && (
                        <li>
                            <Link to={paths.LOGIN}>Login</Link>
                        </li>
                    )}
                    {!isAuthorized && (
                        <li>
                            <Link to={paths.SIGN_UP}>Sign up</Link>
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
    padding-block-start: 1rem;
    padding-block-end: 1rem;
    box-shadow: -3px -7px 11px 0px rgb(0 0 0 / 75%);

    ul {
        display: flex;
        align-items: center;
        margin: 0;
    }
`;
