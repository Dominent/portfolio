import axios from 'axios';

export default {
    sendAsync: (emailInfo) => axios.post(`${process.env.API_URL}/email/send`, emailInfo)
}