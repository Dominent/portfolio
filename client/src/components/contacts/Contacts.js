import React, { Component } from 'react';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';


class Contacts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            phonenumber: '',
            email: '',
            message: ''
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
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
                            <form>
                                <InputGroup
                                    placeholder="Enter Your Name *"
                                    name="firstname"
                                    icon="fas fa-user"
                                    value={this.state.firstname}
                                    onChange={this.onChange}
                                />
                                <InputGroup
                                    placeholder="Enter Phone Number"
                                    name="phonenumber"
                                    icon="fas fa-phone"
                                    value={this.state.phonenumber}
                                    onChange={this.onChange}
                                />
                                <InputGroup
                                    placeholder="Enter Your Email *"
                                    name="email"
                                    icon="fas fa-envelope"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />

                                <TextAreaFieldGroup
                                    placeholder="Enter Your Message *"
                                    name="message"
                                    value={this.state.message}
                                    onChange={this.onChange}
                                >
                                </TextAreaFieldGroup >

                                <div className="row">
                                    <div className="col">
                                        <div className="g-recaptcha" data-sitekey="6LfSK2AUAAAAAKdP36BTVJpvSA1tQXhfSMGHYwqC"></div>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col">
                                        <button type="submit" className="btn btn-lg btn-success mr-2">Submit</button>

                                        <button type="submit"   className="btn btn-lg btn-outline-danger">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contacts;
