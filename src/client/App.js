import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setCurrentUser, logoutUser } from '@store/actions/authActions';
import { clearCurrentProfile } from '@store/actions/profileActions';

import store from './store';
import PrivateRoute from './components/common/PrivateRoute';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import Login from './components/auth/Login';
import GalleryDetails from './components/gallery/GalleryDetails';
import Spa from './Spa';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    store.dispatch(clearCurrentProfile());

    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/gallery" component={GalleryDetails} />
            <Route exact path="/" component={Spa} />
            <Route exact path="/login" component={Login} />
            {/* <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
