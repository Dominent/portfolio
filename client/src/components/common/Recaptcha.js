import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Recaptcha extends Component {
    constructor(props) {
        super(props);

        this.callback = '__recaptcha_callback';
        this.id = '__recaptcha';
    }
    componentDidMount() {
        window[this.callback] = (ev) => this.props.callback(ev);

        const { grecaptcha } = window;

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
    callback: PropTypes.func.isRequired
}

export default Recaptcha;
