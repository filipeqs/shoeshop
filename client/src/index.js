import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import './bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import './sass/main.scss';

import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
