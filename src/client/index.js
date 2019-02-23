import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { configure } from '@store';
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from '@store/actions/authActions';

import './styles/index.scss';

window.addEventListener('DOMContentLoaded', () => {
    const preloadedState = JSON.parse(window.__STATE__ || '');
    delete window.__STATE__;

    const store = configure(preloadedState);

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);

        const decoded = jwt_decode(localStorage.jwtToken);

        store.dispatch(setCurrentUser(decoded));

        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            store.dispatch(logoutUser());
        }
    }

    ReactDOM.render((<Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>), document.getElementById('root'));
})
