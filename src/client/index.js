import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import '/styles/index.scss';

window.addEventListener('DOMContentLoaded', () => {
    const preloadedState = JSON.parse(window.__STATE__ || '');
    delete window.__STATE__;

    const store = configure(preloadedState);

    ReactDOM.render((<Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>), document.getElementById('root'));
})
