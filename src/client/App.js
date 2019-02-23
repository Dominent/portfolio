import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import GalleryDetails from './components/gallery/GalleryDetails';
import Spa from './Spa';
import Dashboard from './components/admin/dashboard';

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
