const path = require('path');
const os = require('os');

const async = require('../../../utils/async');

const { getApp } = require('../../../app/app');

const dbUtils = require('../../shared/db.utils');

const getRandomNumberBetween = (x, y) => {
    return parseInt(Math.random() * (y - x) + x, 10);
};

class Server {
    constructor() {
        this.logsDirectory = path.join(os.tmpdir(), 'app-selenium-logs.log');
        this.connectionString = 'mongodb://localhost/test-db-' + getRandomNumberBetween(1, 1000);

        this.port = getRandomNumberBetween(3000, 4000);
        this.url = 'http://localhost:' + this.port;
    }

    start() {
        return async()
            .then(() => getApp({
                connectionString: this.connectionString,
                logsDirectory: this.logsDirectory,
            }))
            .then((app) => {
                this.app = app;
                return new Promise((resolve) => {
                    this.server = app.listen(this.port, resolve);
                });
            })
            .then(() => {
                return {
                    url: this.url,
                };
            });
    }

    stop() {
        return async()
            .then(() => dbUtils.cleanUp(this.connectionString))
            .then(() => new Promise((resolve) => this.server.close(resolve)));
    }
}


module.exports = { Server };
