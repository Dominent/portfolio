import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import NoMatch from './components/NoMatch';
import ReactGA from 'react-ga';

class App extends Component {
  render() {
    return (
      <Switch>
        {routes.map(({ path, exact, component: Component, ...rest }) => (
          <Route key={path} path={path} exact={exact} render={(props) => (
            <Component {...props} {...rest} />
          )} />
        ))}
        <Route render={(props) => <NoMatch {...props} />} />
      </Switch>
    );
  }
}

ReactGA.initialize(process.env.GOOGLE_ANALYTICS);
ReactGA.pageview(window.location.pathname + window.location.search);

export default App;
