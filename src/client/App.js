import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setCurrentUser, logoutUser } from '@store/actions/authActions';
import { clearCurrentProfile } from '@store/actions/profileActions';

import PrivateRoute from './components/common/PrivateRoute';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import GalleryDetails from './components/gallery/GalleryDetails';
import Spa from './Spa';
import Dashboard from './components/admin/dashboard';

if (typeof window !== 'undefined') {
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
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/gallery" component={() => <GalleryDetails />} />
        <Route exact path="/" component={() => <Spa />} />
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/register" component={() => <Register />} />
        <Switch>
          <PrivateRoute exact path="/admin/dashboard" component={() => <Dashboard />} />
        </Switch>
      </div>
    );
  }
}

export default App;
