import axios from 'axios';

export default {
    verify: (req, res, next) => {
        const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify';

        let buildUrl = (secret, response, remoteip) => `${RECAPTCHA_URL}?secret=${secret}&response=${response}&remoteip=${remoteip}`;

        const data = {
            secret: process.env.RECAPTCHA_URL,
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
