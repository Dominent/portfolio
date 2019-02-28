import validator from 'validator';
import isEmpty from './is-empty';

export default function validateContactInput(data) {
    let errors = {};

    const MESSAGE_MIN_LENGTH = 25;
    const MESSAGE_MAX_LENGTH = 512;

    data.email = !isEmpty(data.email) ? data.email : "";
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.message = !isEmpty(data.message) ? data.message : "";
    data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : "";
    data.recaptcha = !isEmpty(data.recaptcha) ? data.recaptcha : false;

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required, cannot be empty';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email does not match required format';
    }

    if (validator.isEmpty(data.firstname)) {
        errors.firstname = 'Name is required, cannot be empty';
    }

    if (validator.isEmpty(data.message)) {
        errors.message = 'Message is required, cannot be empty';
    }

    if (!validator.isLength(data.message,
        { min: MESSAGE_MIN_LENGTH, max: MESSAGE_MAX_LENGTH })) {
        errors.message = `Message length is invalid, must be between ${MESSAGE_MIN_LENGTH} and ${MESSAGE_MAX_LENGTH} characters long`;
    }

    // if(!data.recaptcha) {
    //     errors.recaptcha = 'The reCAPTCHA code you entered was incorrect';
    // }

    // if (Validator.isEmpty(data.phonenumber)) {
    //     errors.phonenumber = 'Phone number is required, cannot be empty';
    // }

    // TODO(PPavlov): Add Locale to phone [BGN] +359 in UI and send preference
    // if (!Validator.isMobilePhone(data.phonenumber)) {
    //     errors.phonenumber = 'Phone number does not match required format';
    // } 

    return {
        errors,
        isValid: isEmpty(errors)
    };
}