import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../common/Modal';
import Scrollchor from 'react-scrollchor';
import { spring } from 'react-motion';
import { ReactMotionLoop } from 'react-motion-loop';
import Wizard from '../wizard/Wizard'
import ProgresiveWizard from '../wizard/ProgressiveWizard';

const Cursor = () => {
    const styles = {
        blinkingCursor: {
            fontWeight: '100',
            fontSize: '25px',
            color: '#d9d9d9'
        }
    }

    return (<ReactMotionLoop
        styleFrom={{ opacity: 0 }}
        styleTo={{ opacity: spring(1, {damping: 0.4}) }}
    >
        {(style) => (<span style={{...styles.blinkingCursor,...{
             opacity: style.opacity }}}>|</span>)}
    </ReactMotionLoop>
    )
}


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
            <div style={styles.landing}>
                <div style={{...styles.landingInner, ...styles.darkOverlay}} className="text-light">
                    <div className="text-center" style={{ paddingTop: '5%' }}>
                        <h1 className="display-4">Full Stack Developer</h1>
                        <p className="lead p-4">
                            Programmer, eager to learn and constantly accepting new challenges, always striving to become better.
                            <br /> If you are a business seeking a web presence or an employer looking to hire, you can get in touch with
                                me here<Cursor />
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
                            style={{
                                maxWidth: '1200px'
                            }}
                            body={(
                                <div className="container">
                                   <ProgresiveWizard steps={[
                                        {
                                            title: 'Contacts',
                                            content: <div> Test </div>
                                        },
                                        {
                                            name: 'About'
                                        },
                                        {
                                            name: 'Content'
                                        },
                                        {
                                            name: 'Design'
                                        },
                                        {
                                            name: 'Marketing'
                                        },
                                        {
                                            name: 'Maintenance'
                                        }
                                   ]}></ProgresiveWizard>
                                </div>
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
            </div>
        )
    }
}

const styles = {
    landing: {
        position: 'relative',
        background: `url('./img/showcase.jpg') no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        marginTop: '-24px',
        marginBottom: '-50px'
    },
    landingInner: {
        paddingTop: '80px'
    },
    darkOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing);