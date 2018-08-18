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
import CheckboxGroup from './components/common/CheckboxGroup';

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
            <Route exact path="/test" component={() => <CheckboxGroup
              placeholder="Is this a site re-design?"
              name="isRedesign"
              icon="fas fa-user"
              handler={(data) => { console.log(data) }}
              value="Yes"
              options={[
                {
                  title: 'Yes',
                  type: 'success',
                  handler: null
                },
                {
                  title: 'No',
                  type: 'danger',
                  handler: null
                }
              ]}
            />} />
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

const Spa = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div id="id_landing">
        <Landing />
      </div>

      <div id="id_projects">
        <Gallery />
      </div>

      <div id="id_contacts">
        <Contacts />
      </div>

      <Footer />
    </React.Fragment>
  )
}

export default App;
