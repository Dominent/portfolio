import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '@client/store/actions/authActions';
import { clearCurrentProfile } from '@client/store/actions/profileActions';
import Scrollchor from 'react-scrollchor';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();

        this.props.logoutUser();
        this.props.clearCurrentProfile();
    }

    render() {
        return (
            <nav className="navbar fixed-top  navbar-expand-sm mb-4 navbar-dark" style={{
                borderBottom: '1px solid black',
                background: 'linear-gradient(to right, rgb(26, 188, 156), rgb(0, 123, 255))'
            }}>
                <div className="container">
                    <Link className="navbar-brand" to="/">Petromil Pavlov</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Scrollchor to="#id_landing" className="nav-link"> Home</Scrollchor>
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

