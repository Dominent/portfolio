let config = {};

if (process.env.NODE_ENV === 'production') {
    config = {
        email: require('./prod/email-service-prod'),
        mysql: require('./prod/database-mysql-prod'),
        mongo: require('./prod/database-mongo-prod'),
        recaptcha: require('./prod/recaptcha-prod')
    }
} else {
    config = {
        email: require('./dev/email-service-dev'),
        mysql: require('./dev/database-mysql-dev'),
        mongo: require('./dev/database-mongo-dev'),
        recaptcha: require('./dev/recaptcha-dev')
    }
}

module.exports = config;