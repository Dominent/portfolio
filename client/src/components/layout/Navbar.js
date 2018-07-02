import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import Scrollchor from 'react-scrollchor';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();

        this.props.logoutUser();
        this.props.clearCurrentProfile();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/feed">Post Feed</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name} style={{
                                width: '25px',
                                marginRight: '5px'
                            }} title="You must have a Gravatar connected to your email to display an image" />
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            // fixed-top 
            <nav className="navbar fixed-top  navbar-expand-sm mb-4 navbar-dark" style={{
                backgroundColor: '#1abc9c',
                borderBottom: '1px solid black'
            }}>
                <div className="container">
                    <Link className="navbar-brand" to="/"> Petromil Pavlov</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Scrollchor to="" className="nav-link"> Home</Scrollchor>
                            </li>
                            <li className="nav-item">
                                <Scrollchor to="#id_projects" className="nav-link"> Projects </Scrollchor>
                            </li>
                            <li className="nav-item">
                                <Scrollchor to="#id_contacts" className="nav-link"> Contacts </Scrollchor>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {
    logoutUser,
    clearCurrentProfile
})(Navbar);

