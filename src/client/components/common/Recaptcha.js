import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Recaptcha extends Component {
    constructor(props) {
        super(props);

        this.callback = '__recaptcha_callback';
        this.id = '__recaptcha';

        this.verifyRecaptchaCallback = this.verifyRecaptchaCallback.bind(this);
    }

    verifyRecaptchaCallback(responce) {
        this.props.callback({
            target: {
                value: responce,
                name: this.props.name
            }
        })
    }

    componentDidMount() {
        window[this.callback] = this.verifyRecaptchaCallback;

        const { grecaptcha } = window;

        if (grecaptcha == null) {
            return;
        }

        if (!!grecaptcha.render) {
            let id = grecaptcha.render(this.id);
            grecaptcha.reset(id);
        }
    }

    render() {
        const { error, sitekey } = this.props;

        return (
            <React.Fragment>
                <div
                    data-callback={this.callback}
                    className="g-recaptcha"
                    id={this.id}
                    data-sitekey={sitekey}
                ></div>
                {error && (<div className="invalid-feedback" style={{ display: 'block' }}>
                    {error}
                </div>)}
            </React.Fragment>
        )
    }
}

Recaptcha.propTypes = {
    sitekey: PropTypes.string.isRequired,
    name: PropTypes.string,
    callback: PropTypes.func
}

Recaptcha.defaultProps = {
    name: 'grecaptcha'
}

export default Recaptcha;
