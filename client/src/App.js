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
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

import './App.css';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Gallery from './components/gallery/Gallery';
import Contacts from './components/contacts/Contacts';
import Wrapper from './components/gallery/Wrapper';
import GalleryDetails from './components/gallery/GalleryDetails';
import { AnimatedRoute } from 'react-router-transition';

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

const slideInAnimation = {
  atEnter: {
    opacity: 0,
    left: 100,
    backgroundColor: '#fff'
  },
  atLeave: {
    opacity: 0,
    left: 100,
    backgroundColor: '#fff'
  },
  atActive: {
    opacity: 1,
    left: 0
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
            <AnimatedRoute
              path="/gallery"
              component={GalleryDetails}
              atEnter={slideInAnimation.atEnter}
              atLeave={slideInAnimation.atLeave}
              atActive={slideInAnimation.atActive}
              mapStyles={(styles) => ({
                left: `${styles.left}%`
              })}
              className="switch-wrapper"
            />
             <Route exact path="/" component={Spa} />
          </div>
        </Router>
      </Provider>
    );
  }
}

const Spa = () => (
  (
    <Wrapper>
      <Navbar />
      <Landing />

      <div id="id_projects">
        <Gallery />
      </div>

      <div id="id_contacts">
        <Contacts />
      </div>

      <Footer />
    </Wrapper>
  )
)

export default App;

/*
 <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/gallery" component={Gallery} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-education" component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
*/