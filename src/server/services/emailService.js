const axios = require("axios");

const {
    EMAIL_SERVICE_URL,
    EMAIL_SERVICE_RECEIVER,
    EMAIL_SERVICE_PASSWORD,
    EMAIL_SERVICE_USERNAME,
} = process.env;

module.exports = {
    sendTextAsync: (emailInfo) => {
        return axios.post(`${EMAIL_SERVICE_URL}/api/email/text?username=${EMAIL_SERVICE_USERNAME}&password=${EMAIL_SERVICE_PASSWORD}`, 
            Object.assign(emailInfo, {
                sender: EMAIL_SERVICE_USERNAME,
                receiver: EMAIL_SERVICE_RECEIVER
            }));
    },
    sentHtmlAsync: (emailInfo) => {
        return axios.post(`${EMAIL_SERVICE_URL}/api/email/html?username=${EMAIL_SERVICE_USERNAME}&password=${EMAIL_SERVICE_PASSWORD}`, 
            Object.assign(emailInfo, {
                sender: EMAIL_SERVICE_USERNAME,
                receiver: EMAIL_SERVICE_RECEIVER
            }));
    }
}