import validator from 'validator';
import isEmpty from './is-empty';

export default function validatePropolsalInput(data) {
    let errors = {};

    data.message = !isEmpty(data.message) ? data.message : "";

    if (validator.isEmpty(data.message)) {
        errors.email = 'Message is required, cannot be empty';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}