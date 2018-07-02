import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../common/Modal';
import Scrollchor from 'react-scrollchor';

class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        }
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div className="flat-section">
                <div className="jumbotron text-center">
                    <h1 className="display-4">Web Developer</h1>
                    <p className="lead p-4">
                        Based out of Halifax, NS. Specializing in custom WordPress theme development.
                  <br /> If you are a business seeking a web presence or an employer looking to hire, you can get in touch with
                                                                                              me here.
              </p>
                    <hr />
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <button
                                    type="button"
                                    className="btn btn-lg btn-primary mr-2"
                                    onClick={() => this.setState({ modalIsOpen: true })}
                                >I Need A Website</button>
                                <Scrollchor to="#id_contacts" className="btn btn-lg btn-primary ml-2">Hire Me</Scrollchor>
                            </div>
                        </div>
                    </div>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        header={(
                            <React.Fragment>
                                <h5 className="modal-title">Modal title</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => this.setState({ modalIsOpen: false })}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </React.Fragment>
                        )}
                        body={(
                            <React.Fragment>
                                <p>Modal body text goes here.</p>
                            </React.Fragment>
                        )}
                        footer={(
                            <React.Fragment>
                                <button type="button" className="btn btn-primary">Save changes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </React.Fragment>
                        )}
                    />
                </div>
            </div>
        )
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing);