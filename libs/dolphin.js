const mysql = require('mysql');

const config = require('../configuration/config');

//TODO(PPavlov): Add execute all files in given folders
//TODO(PPavlov): Add execute seed
//TODO(PPavlov): Add init
//TODO(PPavlov): Test

function mysqlConnect() {
    let connection = mysql.createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
    });

    return new Promise((resolve, reject) =>
        connection.connect((err) => {
            if (err) { reject(err); }

            resolve(connection);
        }));
}

function buildResponce(results) {
    return {
        Data: !!results[0] ?
            results[0].map(res => Object.assign({}, res)) :
            null,
        Status: !!results[1] ?
            results[1].serverStatus :
            results.serverStatus
    };
}

function buildParams(params) {
    return ' ( ' + Object.keys(params)
        .map(param => `@${param} := '${params[param]}'`)
        .join(', ') + ' )';
}

function executeQuery(con, query, reject, resolve) {
    con.query(query, (error, results, fields) => {
        try {
            if (error) { reject(error); }

            con.end();

            resolve(buildResponce(results));
        }
        catch (err) {
            con.end();

            reject(err);
        }
    });
}

const dolphin = {
    query: (sql) => { throw new Error('NOT IMPLEMENTED!') },
    exec: (name, params = {}) => {
        return mysqlConnect()
            .then(con => new Promise((resolve, reject) => {
                let query = `CALL ${name}` + buildParams(params);

                console.log(`[QUERY]${query}`);

                return executeQuery(con, query, reject, resolve);
            })
        )
    }
}

module.exports = dolphin;
