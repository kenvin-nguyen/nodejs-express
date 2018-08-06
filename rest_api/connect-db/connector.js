'use strict';
const knex = require('knex');

class Connector {
    constructor(config) {
        this.dbs = {};
        this.db = knex({
            client: 'pg',
            connection: config.connection,
            pool: config.pool
        });
    }

    connect() {
        let _middleware = (req, res, next) => {
            let token = req.user;
            if (this.dbs[token.host]) {
                req.db = this.dbs[token.host];
                next();
                return;
            }

            this.db('env').select('db').where('host', token.host).first().then(row => {
                if (row === undefined) {
                    next(new Error(`Connection failed: no host found for ${token.host}`));
                } else {
                    req.db = this.dbs[token.host] = knex({
                        client: 'pg',
                        connection: row.db,
                        pool: {
                            min: 5,
                            max: 10
                        }
                    });
                    next();
                }
            });
        };

        _middleware.unless = require('express-unless');
        return _middleware;
    }

}

module.exports = function (config) {
    return new Connector(config);
};