import axios from 'axios';

const {
    RECAPTCHA_SECRET,
    RECAPTCHA_URL
} = process.env;

export default {
    verify: (req, res, next) => {
        let buildUrl = (secret, response, remoteip) => `${RECAPTCHA_URL}?secret=${secret}&response=${response}&remoteip=${remoteip}`;

        const data = {
            secret: RECAPTCHA_SECRET,
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
