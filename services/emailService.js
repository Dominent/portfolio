const axios = require("axios");

const config = require('../configuration/config');

const {
    url,
    username, 
    password, 
    receiver
} = config.email;

module.exports = {
    sendTextAsync: (emailInfo) => {
        return axios.post(`${url}/api/email/text?username=${username}&password=${password}`, 
            Object.assign(emailInfo, {
                sender: username,
                receiver: receiver
            }));
    },
    sentHtmlAsync: (emailInfo) => {
        return axios.post(`${url}/api/email/html?username=${username}&password=${password}`, 
            Object.assign(emailInfo, {
                sender: username,
                receiver: receiver
            }));
    }
}