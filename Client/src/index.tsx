import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import { history } from 'lib/history';
import { store } from 'store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { App } from './App';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
