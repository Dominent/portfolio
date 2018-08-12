import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../common/Modal';
import Scrollchor from 'react-scrollchor';
import { spring } from 'react-motion';
import { ReactMotionLoop } from 'react-motion-loop';
import Wizard from '../wizard/Wizard'
import ProgresiveWizard from '../wizard/ProgressiveWizard';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import CheckboxGroup from '../common/CheckboxGroup';
import TextFieldGroup from '../common/TextFieldGroup';

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
        styleTo={{ opacity: spring(1, { damping: 0.4 }) }}
    >
        {(style) => (<span style={{
            ...styles.blinkingCursor, ...{
                opacity: style.opacity
            }
        }}>|</span>)}
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
        const errors = {};
        return (
            <div style={styles.landing}>
                <div style={{ ...styles.landingInner, ...styles.darkOverlay }} className="text-light">
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
                                            content: (
                                                <form>
                                                    <InputGroup
                                                        placeholder="Enter Your Name"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                    <InputGroup
                                                        placeholder="Enter Phone Number"
                                                        name="phonenumber"
                                                        icon="fas fa-phone"
                                                        value={this.state.phonenumber}
                                                        onChange={this.onChange}
                                                        error={errors.phonenumber}
                                                    />
                                                    <InputGroup
                                                        placeholder="Enter Your Email *"
                                                        name="email"
                                                        icon="fas fa-envelope"
                                                        value={this.state.email}
                                                        onChange={this.onChange}
                                                        error={errors.email}
                                                    />
                                                </form>
                                            )
                                        },
                                        {
                                            title: 'About',
                                            content: (
                                                <form>
                                                    <InputGroup
                                                        placeholder="What is the name of your business?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                    <TextAreaFieldGroup
                                                        placeholder="Describe your business and what products or services you offer."
                                                        name="message"
                                                        value={this.state.message}
                                                        onChange={this.onChange}
                                                        error={errors.message}
                                                    >
                                                    </TextAreaFieldGroup >
                                                    <InputGroup
                                                        placeholder="Do you have a timeframe or deadline for your websites launch?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                    <CheckboxGroup
                                                        placeholder="Is this a site re-design?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        options={[
                                                            {
                                                                title: 'Yes',
                                                                type: 'success',
                                                                handler: () => console.log('Yes')
                                                            },
                                                            {
                                                                title: 'No',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                        ]}
                                                    />
                                                    <CheckboxGroup
                                                        placeholder="Do you currently have hosting?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        options={[
                                                            {
                                                                title: 'Yes',
                                                                type: 'success',
                                                                handler: () => console.log('Yes')
                                                            },
                                                            {
                                                                title: 'No',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                        ]}
                                                        info="Please note that we offer free hosting to charities."
                                                    />
                                                    <TextFieldGroup
                                                        icon="fas fa-user"
                                                        placeholder="Do you currently have a domain? (e.g. www.yourwebsite.com)"
                                                        name="fieldofstudy"
                                                        info="If not, please enter your desired domain name."
                                                        value={this.state.fieldofstudy}
                                                        onChange={this.onChange}
                                                        error={errors.fieldofstudy}
                                                    />
                                                    <InputGroup
                                                        placeholder="What is your budget for this project?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                </form>)
                                        },
                                        {
                                            title: 'Content',
                                            content: (
                                                <form>
                                                    <TextFieldGroup
                                                        icon="fas fa-user"
                                                        placeholder="Roughly, how many pages will your site consist of?"
                                                        name="fieldofstudy"
                                                        info="(e.g. Home, About, Services, Contact)"
                                                        value={this.state.fieldofstudy}
                                                        onChange={this.onChange}
                                                        error={errors.fieldofstudy}
                                                    />
                                                    <CheckboxGroup
                                                        placeholder="What actions should the user perform when visiting your site?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        options={[
                                                            {
                                                                title: 'Call you',
                                                                type: 'success',
                                                                handler: () => console.log('Call you')
                                                            },
                                                            {
                                                                title: 'Sign up for your mailing list',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Purchase a product',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Fill out contact form',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Other',
                                                                type: 'danger',
                                                                editable: true,
                                                                placeholder: 'Enter an other option',
                                                                handler: () => console.log('No')
                                                            },
                                                        ]}
                                                    />
                                                    <CheckboxGroup
                                                        placeholder="Please check which features you are interested in."
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        options={[
                                                            {
                                                                title: 'E-commerce',
                                                                type: 'success',
                                                                handler: () => console.log('Yes')
                                                            },
                                                            {
                                                                title: 'Membership',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Blog',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Gallery',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Multi-lingual support',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                        ]}
                                                    />
                                                    <InputGroup
                                                        placeholder="Is there any specific functionality that your site needs that wasn't mentioned?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                </form>
                                            )
                                        },
                                        {
                                            title: 'Design',
                                            content: (
                                                <form>
                                                    <CheckboxGroup
                                                        placeholder="Are you interested in a single page design?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        options={[
                                                            {
                                                                title: 'Yes',
                                                                type: 'success',
                                                                handler: () => console.log('Yes')
                                                            },
                                                            {
                                                                title: 'No',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Not sure',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            }
                                                        ]}
                                                    />
                                                    <CheckboxGroup
                                                        placeholder="Are you interested in a responsive website? (e.g. http://finecitizens.com/defineResponsive)"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        options={[
                                                            {
                                                                title: 'Yes',
                                                                type: 'success',
                                                                handler: () => console.log('Yes')
                                                            },
                                                            {
                                                                title: 'No',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Not sure',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            }
                                                        ]}
                                                        info="This means that your website adapts to the device it is being viewed on (phone, tablet, laptop, etc)"
                                                    />
                                                    <InputGroup
                                                        placeholder="Do you have any examples of website that you like? What do you like about them?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                    <InputGroup
                                                        placeholder="Do you have any examples of website that you dislike? What do you dislike about them?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                    <CheckboxGroup
                                                        placeholder="Do you have a logo?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        options={[
                                                            {
                                                                title: 'Yes',
                                                                type: 'success',
                                                                handler: () => console.log('Call you')
                                                            },
                                                            {
                                                                title: 'No',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Other',
                                                                type: 'danger',
                                                                editable: true,
                                                                placeholder: 'Enter an other option',
                                                                handler: () => console.log('No')
                                                            }
                                                        ]}
                                                    />
                                                    <InputGroup
                                                        placeholder="Do you have branding that the websites design should reflect upon? (e.g. colors, fonts, themes)"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                </form>
                                            )
                                        },
                                        {
                                            title: 'Marketing',
                                            content: (
                                                <form>
                                                    <InputGroup
                                                        placeholder="How do people find out about your business right now?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                    <InputGroup
                                                        placeholder="Who is your target demographic?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                    <InputGroup
                                                        placeholder="If someone is searching for your product/service, which search terms might they use?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                    <CheckboxGroup
                                                        placeholder="Is your business currently active on any social media platforms?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        options={[
                                                            {
                                                                title: 'Facebook',
                                                                type: 'success',
                                                                handler: () => console.log('Call you')
                                                            },
                                                            {
                                                                title: 'Twitter',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'YouTube',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Google+',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'LinkedIn',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Pinterest',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Yelp',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'TripAdvisor',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Other',
                                                                type: 'danger',
                                                                editable: true,
                                                                placeholder: 'Enter an other option',
                                                                handler: () => console.log('No')
                                                            }
                                                        ]}
                                                    />
                                                    <InputGroup
                                                        placeholder="Do you wish to incorporate any social media feeds into your site?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                    <InputGroup
                                                        placeholder="Please include links to any notable competitors that you have."
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                    <CheckboxGroup
                                                        placeholder="Will you need printed materials produced?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        options={[
                                                            {
                                                                title: 'Business cards',
                                                                type: 'success',
                                                                handler: () => console.log('Call you')
                                                            },
                                                            {
                                                                title: 'Flyers',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Brochures',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Other',
                                                                type: 'danger',
                                                                editable: true,
                                                                placeholder: 'Enter an other option',
                                                                handler: () => console.log('No')
                                                            }
                                                        ]}
                                                    />
                                                </form>
                                            )
                                        },
                                        {
                                            title: 'Maintenance',
                                            content: (
                                                <form>
                                                    <CheckboxGroup
                                                        placeholder="Do you think you will need routine updates on your website?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        options={[
                                                            {
                                                                title: 'Yes',
                                                                type: 'success',
                                                                handler: () => console.log('Call you')
                                                            },
                                                            {
                                                                title: 'No',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                        ]}
                                                    />
                                                    <CheckboxGroup
                                                        placeholder="Would you like to be able to do most of the updating yourself?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        options={[
                                                            {
                                                                title: 'Yes',
                                                                type: 'success',
                                                                handler: () => console.log('Call you')
                                                            },
                                                            {
                                                                title: 'No',
                                                                type: 'danger',
                                                                handler: () => console.log('No')
                                                            },
                                                            {
                                                                title: 'Other',
                                                                type: 'danger',
                                                                editable: true,
                                                                placeholder: 'Enter an other option',
                                                                handler: () => console.log('No')
                                                            }
                                                        ]}
                                                    />
                                                    <InputGroup
                                                        placeholder="Are there any features that you don't want now but may want in the future?"
                                                        name="firstname"
                                                        icon="fas fa-user"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname}
                                                    />
                                                </form>
                                            )
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