import './App.scss';
import { useDispatch, useSelector } from 'store';
import { logout } from 'store/auth';
import { fetchLogin } from 'store/auth/actions';

export const App = () => {
    const dispatch = useDispatch();

    const { isAuthorized, loadingFlags } = useSelector((state) => ({
        isAuthorized: state.auth.isAuthorized,
        loadingFlags: state.auth.loadingFlags,
    }));

    return (
        <div className="App">
            {loadingFlags[fetchLogin.typePrefix] && <span>Loading...</span>}

            {isAuthorized ? (
                <button
                    onClick={() => {
                        dispatch(logout());
                    }}
                >
                    Log out
                </button>
            ) : (
                <button
                    onClick={() => {
                        dispatch(
                            fetchLogin({
                                email: 'artem.sdobnikov@nure.ua',
                                password: 'Qwerty12345!',
                                rememberMe: true,
                            })
                        );
                    }}
                >
                    Log in
                </button>
            )}
        </div>
    );
};
