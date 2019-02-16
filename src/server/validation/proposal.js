const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePropolsalInput(data) {
    let errors = {};

    data.message = !isEmpty(data.message) ? data.message : "";

    if (Validator.isEmpty(data.message)) {
        errors.email = 'Message is required, cannot be empty';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}