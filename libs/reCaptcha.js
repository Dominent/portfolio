const axios = require('axios');

const config = require('../configuration/config');

const reCAPTCHA = {
    verify: (req, res, next) => {
        const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify';

        let buildUrl = (secret, response, remoteip) => `${RECAPTCHA_URL}?secret=${secret}&response=${response}&remoteip=${remoteip}`;

        const data = {
            secret: config.recaptcha.secret,
            response: req.body.grecaptcha,
        }

        axios.post(buildUrl(data.secret, data.response, null))
            .then((recaptchaRes) => {
                const { success } = recaptchaRes.data;

                if (!success) {
                    return res.status(400).json({ recaptcha: 'The reCAPTCHA you entered was incorrect' })
                }

                return next();
            })
            .catch((err) => {
                return res.status(400).json({ recaptcha: 'Couldnt validate reCAPTCHA, opperation failed' })
            })
    }
}

module.exports = reCAPTCHA;