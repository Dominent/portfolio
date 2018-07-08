import React, { Component } from 'react';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import axios from 'axios';
import Spinner from '../common/Spinner';
import Recaptcha from '../common/Recaptcha';

class Contacts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            phonenumber: '',
            email: '',
            message: '',
            loading: false,
            recaptcha: false,
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
    }

    onSubmit(ev) {
        ev.preventDefault();

        const { email, firstname, message, phonenumber, recaptcha } = this.state;

        const contactData = {
            email,
            firstname,
            message,
            phonenumber,
            recaptcha
        };

        this.setState({ loading: true })

        axios.post('/api/contacts', contactData)
            .then((res) => {
                this.setState({ loading: false })
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data,
                    recaptcha: false,
                    loading: false
                });
            })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { errors } = this.state;

        const sitekey = '6LfSK2AUAAAAAKdP36BTVJpvSA1tQXhfSMGHYwqC';

        return (
            <div className="flat-section">
                <div className="jumbotron">
                    <div className="container">
                        <header className="text-center">
                            <h1 className="display-4">Contact Me</h1>
                            <p className="lead">Use the contact form below to get in touch</p>
                            <hr></hr>
                            <span className="text-muted">* Marks Required Fields</span>
                        </header>
                        <main>
                            {this.state.loading ? (<Spinner />) : (
                                <form>
                                    <InputGroup
                                        placeholder="Enter Your Name *"
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

                                    <TextAreaFieldGroup
                                        placeholder="Enter Your Message *"
                                        name="message"
                                        value={this.state.message}
                                        onChange={this.onChange}
                                        error={errors.message}
                                    >
                                    </TextAreaFieldGroup >

                                    <div className="row">
                                        <div className="col">
                                            <Recaptcha
                                                sitekey={sitekey}
                                                callback={(ev) => {
                                                    this.setState({ recaptcha: true });
                                                }}
                                                error={errors.recaptcha}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <button
                                                type="submit"
                                                className="btn btn-lg btn-success mr-2"
                                                onClick={this.onSubmit.bind(this)}
                                            >Submit</button>

                                            <button type="submit" className="btn btn-lg btn-outline-danger">Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contacts;
