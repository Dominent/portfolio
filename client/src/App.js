import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { clearCurrentProfile } from './actions/profileActions';

import store from './store';
import PrivateRoute from './components/common/PrivateRoute';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import './App.css';
import Gallery from './components/gallery/Gallery';
import Contacts from './components/contacts/Contacts';
import GalleryDetails from './components/gallery/GalleryDetails';
import ResponsiveGallery from './components/gallery/ResponsiveGallery';

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
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/gallery" component={GalleryDetails} />
            <Route exact path="/" component={Spa} />

            <Route exact path="/test" component={ResponsiveGallery} />

            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

const Spa = () =>
  (
    <React.Fragment>
      <Navbar />
      <Landing />

      <div id="id_projects">
        <Gallery />
      </div>

      <div id="id_contacts">
        <Contacts />
      </div>

      <Footer />
    </React.Fragment>
  )

export default App;
