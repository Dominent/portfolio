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
import axios from 'axios';
import WebsiteTemplate from '../../templates/WebsiteTemplate';
import Spinner from '../common/Spinner';

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
            isOpen: false,
            input: {},
            loading: false
        }

        this.checkboxHandler = this.checkboxHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.finishClickHandler = this.finishClickHandler.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    inputHandler(ev) {
        const { name, value } = ev.target;

        this.setState({ input:
            Object.assign(this.state.input, {
                [name]: value 
            }) });
    }

    finishClickHandler() {
        const { input } = this.state;

        let data = {
            message: WebsiteTemplate.build(input),
        };

        this.setState({ loading: true })

        axios.post('/api/proposals', data)
            .catch((err) => {
                console.log(err)
            })
            .then((res) => this.setState({
                loading: false,
                isOpen: false
            }))
    }

    checkboxHandler(ev, title, option) {
        const { name, checked } = ev.target;

        this.setState({
            input: Object.assign(this.state.input, {
                [name]: {
                    title,
                    option,
                    checked
                }
            })
        });
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
                                        onClick={() => this.setState({ isOpen: true })}
                                    >I Need A Website</button>
                                    <Scrollchor to="#id_contacts" className="btn btn-lg btn-primary ml-2">Hire Me</Scrollchor>
                                </div>
                            </div>
                        </div>

                        <Modal
                            isOpen={this.state.isOpen}
                            header={(
                                <React.Fragment>
                                    <h5 className="modal-title">Website Request</h5>
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={() => this.setState({ isOpen: false })}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </React.Fragment>
                            )}
                            style={{
                                maxWidth: '1200px'
                            }}
                            body={(
                                <div className="container">
                                    <ProgresiveWizard
                                        finishClickHandler={this.finishClickHandler}
                                        steps={[
                                            {
                                                title: 'Contacts',
                                                content: (
                                                    <form>
                                                        <InputGroup
                                                            placeholder="Enter Your Name"
                                                            name="firstname"
                                                            icon="fas fa-user"
                                                            value={this.state.input.firstname}
                                                            onChange={this.inputHandler}
                                                            error={errors.firstname}
                                                        />
                                                        <InputGroup
                                                            placeholder="Enter Phone Number"
                                                            name="phonenumber"
                                                            icon="fas fa-phone"
                                                            value={this.state.input.phonenumber}
                                                            onChange={this.inputHandler}
                                                            error={errors.phonenumber}
                                                        />
                                                        <InputGroup
                                                            placeholder="Enter Your Email *"
                                                            name="email"
                                                            icon="fas fa-envelope"
                                                            value={this.state.input.email}
                                                            onChange={this.inputHandler}
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
                                                            name="businessName"
                                                            icon="fas fa-user"
                                                            value={this.state.input.businessName}
                                                            onChange={this.inputHandler}
                                                            error={errors.businessName}
                                                        />
                                                        <TextAreaFieldGroup
                                                            placeholder="Describe your business and what products or services you offer."
                                                            name="businessDescription"
                                                            value={this.state.input.businessDescription}
                                                            onChange={this.inputHandler}
                                                            error={errors.businessDescription}
                                                        >
                                                        </TextAreaFieldGroup >
                                                        <InputGroup
                                                            placeholder="Do you have a timeframe or deadline for your websites launch?"
                                                            name="deadline"
                                                            icon="fas fa-user"
                                                            value={this.state.input.deadline}
                                                            onChange={this.inputHandler}
                                                            error={errors.deadline}
                                                        />
                                                        <CheckboxGroup
                                                            placeholder="Is this a site re-design?"
                                                            name="isRedesign"
                                                            icon="fas fa-user"
                                                            options={[
                                                                {
                                                                    title: 'Yes',
                                                                    type: 'success'
                                                                },
                                                                {
                                                                    title: 'No',
                                                                    type: 'danger'
                                                                }
                                                            ].map(x => Object.assign(x, {
                                                                handler: this.checkboxHandler
                                                            }))}
                                                        />
                                                        <CheckboxGroup
                                                            placeholder="Do you currently have hosting?"
                                                            name="hosting"
                                                            icon="fas fa-user"
                                                            options={[
                                                                {
                                                                    title: 'Yes',
                                                                    type: 'success',
                                                                },
                                                                {
                                                                    title: 'No',
                                                                    type: 'danger',
                                                                },
                                                            ].map(x => Object.assign(x, {
                                                                handler: this.checkboxHandler
                                                            }))}
                                                            info="Please note that we offer free hosting to charities."
                                                        />
                                                        <TextFieldGroup
                                                            icon="fas fa-user"
                                                            placeholder="Do you currently have a domain? (e.g. www.yourwebsite.com)"
                                                            name="fieldofstudy"
                                                            info="If not, please enter your desired domain name."
                                                            value={this.state.fieldofstudy}
                                                            onChange={this.inputHandler}
                                                            error={errors.fieldofstudy}
                                                        />
                                                        <InputGroup
                                                            placeholder="What is your budget for this project?"
                                                            name="budget"
                                                            icon="fas fa-user"
                                                            value={this.state.budget}
                                                            onChange={this.inputHandler}
                                                            error={errors.budget}
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
                                                            name="pages"
                                                            info="(e.g. Home, About, Services, Contact)"
                                                            value={this.state.pages}
                                                            onChange={this.inputHandler}
                                                            error={errors.pages}
                                                        />
                                                        <CheckboxGroup
                                                            placeholder="What actions should the user perform when visiting your site?"
                                                            name="actions"
                                                            icon="fas fa-user"
                                                            options={[
                                                                {
                                                                    title: 'Call you',
                                                                    type: 'success',
                                                                },
                                                                {
                                                                    title: 'Sign up for your mailing list',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Purchase a product',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Fill out contact form',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Other',
                                                                    type: 'danger',
                                                                    editable: true,
                                                                    placeholder: 'Enter an other option',
                                                                },
                                                            ].map(x => Object.assign(x, {
                                                                handler: this.checkboxHandler
                                                            }))}
                                                        />
                                                        <CheckboxGroup
                                                            placeholder="Please check which features you are interested in."
                                                            name="features"
                                                            icon="fas fa-user"
                                                            options={[
                                                                {
                                                                    title: 'E-commerce',
                                                                    type: 'success',
                                                                },
                                                                {
                                                                    title: 'Membership',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Blog',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Gallery',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Multi-lingual support',
                                                                    type: 'danger',
                                                                },
                                                            ].map(x => Object.assign(x, {
                                                                handler: this.checkboxHandler
                                                            }))}
                                                        />
                                                        <InputGroup
                                                            placeholder="Is there any specific functionality that your site needs that wasn't mentioned?"
                                                            name="functionality"
                                                            icon="fas fa-user"
                                                            value={this.state.functionality}
                                                            onChange={this.inputHandler}
                                                            error={errors.functionality}
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
                                                            name="isSinglePage"
                                                            icon="fas fa-user"
                                                            options={[
                                                                {
                                                                    title: 'Yes',
                                                                    type: 'success',
                                                                },
                                                                {
                                                                    title: 'No',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Not sure',
                                                                    type: 'danger',
                                                                }
                                                            ].map(x => Object.assign(x, {
                                                                handler: this.checkboxHandler
                                                            }))}
                                                        />
                                                        <CheckboxGroup
                                                            placeholder="Are you interested in a responsive Design? (e.g. http://finecitizens.com/defineResponsive)"
                                                            name="isResponsive"
                                                            icon="fas fa-user"
                                                            options={[
                                                                {
                                                                    title: 'Yes',
                                                                    type: 'success',
                                                                },
                                                                {
                                                                    title: 'No',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Not sure',
                                                                    type: 'danger',
                                                                }
                                                            ].map(x => Object.assign(x, {
                                                                handler: this.checkboxHandler
                                                            }))}
                                                            info="This means that your website adapts to the device it is being viewed on (phone, tablet, laptop, etc)"
                                                        />
                                                        <InputGroup
                                                            placeholder="Do you have any examples of website that you like? What do you like about them?"
                                                            name="websiteLikeEx"
                                                            icon="fas fa-user"
                                                            value={this.state.websiteLikeEx}
                                                            onChange={this.inputHandler}
                                                            error={errors.websiteLikeEx}
                                                        />
                                                        <InputGroup
                                                            placeholder="Do you have any examples of website that you dislike? What do you dislike about them?"
                                                            name="websiteDislikeEx"
                                                            icon="fas fa-user"
                                                            value={this.state.websiteDislikeEx}
                                                            onChange={this.inputHandler}
                                                            error={errors.websiteDislikeEx}
                                                        />
                                                        <CheckboxGroup
                                                            placeholder="Do you have a logo?"
                                                            name="hasLogo"
                                                            icon="fas fa-user"
                                                            options={[
                                                                {
                                                                    title: 'Yes',
                                                                    type: 'success',
                                                                },
                                                                {
                                                                    title: 'No',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Other',
                                                                    type: 'danger',
                                                                    editable: true,
                                                                    placeholder: 'Enter an other option',
                                                                }
                                                            ].map(x => Object.assign(x, {
                                                                handler: this.checkboxHandler
                                                            }))}
                                                        />
                                                        <InputGroup
                                                            placeholder="Do you have branding that the websites design should reflect upon? (e.g. colors, fonts, themes)"
                                                            name="branding"
                                                            icon="fas fa-user"
                                                            value={this.state.branding}
                                                            onChange={this.inputHandler}
                                                            error={errors.branding}
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
                                                            name="businessDiscovery"
                                                            icon="fas fa-user"
                                                            value={this.state.businessDiscovery}
                                                            onChange={this.inputHandler}
                                                            error={errors.businessDiscovery}
                                                        />
                                                        <InputGroup
                                                            placeholder="Who is your target demographic?"
                                                            name="target"
                                                            icon="fas fa-user"
                                                            value={this.state.target}
                                                            onChange={this.inputHandler}
                                                            error={errors.target}
                                                        />
                                                        <InputGroup
                                                            placeholder="If someone is searching for your product/service, which search terms might they use?"
                                                            name="searchTerms"
                                                            icon="fas fa-user"
                                                            value={this.state.searchTerms}
                                                            onChange={this.inputHandler}
                                                            error={errors.searchTerms}
                                                        />
                                                        <CheckboxGroup
                                                            placeholder="Is your business currently active on any social media platforms?"
                                                            name="activeSocialMediaPlatforms"
                                                            icon="fas fa-user"
                                                            options={[
                                                                {
                                                                    title: 'Facebook',
                                                                    type: 'success',
                                                                },
                                                                {
                                                                    title: 'Twitter',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'YouTube',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Google+',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'LinkedIn',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Pinterest',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Yelp',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'TripAdvisor',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Other',
                                                                    type: 'danger',
                                                                    editable: true,
                                                                    placeholder: 'Enter an other option',
                                                                }
                                                            ].map(x => Object.assign(x, {
                                                                handler: this.checkboxHandler
                                                            }))}
                                                        />
                                                        <InputGroup
                                                            placeholder="Do you wish to incorporate any social media feeds into your site?"
                                                            name="feed"
                                                            icon="fas fa-user"
                                                            value={this.state.feed}
                                                            onChange={this.inputHandler}
                                                            error={errors.feed}
                                                        />
                                                        <InputGroup
                                                            placeholder="Please include links to any notable competitors that you have."
                                                            name="competitors"
                                                            icon="fas fa-user"
                                                            value={this.state.competitors}
                                                            onChange={this.inputHandler}
                                                            error={errors.competitors}
                                                        />
                                                        <CheckboxGroup
                                                            placeholder="Will you need printed materials produced?"
                                                            name="prints"
                                                            icon="fas fa-user"
                                                            options={[
                                                                {
                                                                    title: 'Business cards',
                                                                    type: 'success',
                                                                },
                                                                {
                                                                    title: 'Flyers',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Brochures',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Other',
                                                                    type: 'danger',
                                                                    editable: true,
                                                                    placeholder: 'Enter an other option',
                                                                }
                                                            ].map(x => Object.assign(x, {
                                                                handler: this.checkboxHandler
                                                            }))}
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
                                                            name="hasRoutineUpdates"
                                                            icon="fas fa-user"
                                                            options={[
                                                                {
                                                                    title: 'Yes',
                                                                    type: 'success',
                                                                },
                                                                {
                                                                    title: 'No',
                                                                    type: 'danger',
                                                                },
                                                            ].map(x => Object.assign(x, {
                                                                handler: this.checkboxHandler
                                                            }))}
                                                        />
                                                        <CheckboxGroup
                                                            placeholder="Would you like to be able to do most of the updating yourself?"
                                                            name="automaticUpdate"
                                                            icon="fas fa-user"
                                                            options={[
                                                                {
                                                                    title: 'Yes',
                                                                    type: 'success',
                                                                },
                                                                {
                                                                    title: 'No',
                                                                    type: 'danger',
                                                                },
                                                                {
                                                                    title: 'Other',
                                                                    type: 'danger',
                                                                    editable: true,
                                                                    placeholder: 'Enter an other option',
                                                                }
                                                            ].map(x => Object.assign(x, {
                                                                handler: this.checkboxHandler
                                                            }))}
                                                        />
                                                        <InputGroup
                                                            placeholder="Are there any features that you don't want now but may want in the future?"
                                                            name="futureFeatures"
                                                            icon="fas fa-user"
                                                            value={this.state.futureFeatures}
                                                            onChange={this.inputHandler}
                                                            error={errors.futureFeatures}
                                                        />
                                                    </form>
                                                )
                                            }
                                        ]}></ProgresiveWizard>
                                </div>
                            )}
                            footer={(
                                <React.Fragment>
                                    {this.state.loading ? <Spinner width="50px" /> : null}

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => this.setState({ isOpen: false })}
                                    >
                                        Close
                                    </button>
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