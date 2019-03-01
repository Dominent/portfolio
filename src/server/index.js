import { configure } from '@store';
import express from 'express';
import bodyParser from 'body-parser'
import App from '@client/App';
import template from './template';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from "react-router-dom"

import UsersRoute from './routes/api/users';
import ProjectsRoute from './routes/api/projects';
import ProposalsRoute from './routes/api/proposals';
import ContactsRoute from './routes/api/contacts';

import routes from '../client/routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', UsersRoute);
app.use('/api/projects', ProjectsRoute);
app.use('/api/proposals', ProposalsRoute);
app.use('/api/contacts', ContactsRoute);

app.use(express.static('build/public'));

const initialState = {}
const store = configure(initialState);

app.get('*', (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}
  const state = store.getState();

  if (activeRoute.authorize) {
    if (!state.auth.isAuthenticated) {
      res.redirect('/login');
    }
  }

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }

    const content = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    )

    const preloadedState = store.getState();

    res.status(200).send(template({ content, state: preloadedState }))
  }).catch(next);
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server runing on port: ${port}`);
});
