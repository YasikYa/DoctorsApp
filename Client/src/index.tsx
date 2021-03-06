import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import { history } from 'lib/history';
import { store } from 'store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { App } from './App';
import { ConfigProvider } from 'antd';
import 'moment/locale/ru';
import ruRu from 'antd/lib/locale/ru_RU';

ReactDOM.render(
    <ConfigProvider locale={ruRu}>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root')
);
