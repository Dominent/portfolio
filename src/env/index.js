const dotenv = require('dotenv');
const path = require('path');

let env = {};
if (process.env.NODE_ENV === 'test') {
    env = dotenv.config({
        path: path.resolve(__dirname, '.env.test')
    }).parsed;
} else if (process.env.NODE_ENV === 'production') {
    env = dotenv.config({ 
        path: path.resolve(__dirname, '.env.production') 
    }).parsed;
} else {
    env = dotenv.config({
        path: path.resolve(__dirname, '.env.development')
    }).parsed;
}

module.exports = env;
