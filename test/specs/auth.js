/* globals browser */

const os = require('os');
const path = require('path');

const { expect } = require('chai');

const { getApp } = require('../../app/app');

const ui = require('./shared/ui.utils');
const authUtils = require('./shared/auth.utils');

const dbUtils = require('../shared/db.utils');

const async = require('../../utils/async');
describe('Auth tests', () => {
    let port = null;
    let url = null;
    let app = null;
    let server = null;
    let connectionString = null;

    const logsDirectory =
        path.join(os.tmpdir(), 'app-selenium-logs' + Math.random());

    beforeEach((done) => {
        connectionString = 'mongodb://localhost/test-db-' + parseInt(Math.random() * 100, 10);
        port = parseInt(Math.random() * 1000 + 3000, 10);
        url = 'http://localhost:' + port;
        return async()
            .then(() => getApp({ connectionString, logsDirectory }))
            .then((_app) => {
                app = _app;
                return new Promise((resolve) => {
                    server = app.listen(port, resolve);
                });
            })
            .then(() => {
                ui.setBrowser(browser);
                browser.url(url);
            })
            .then(done);
    });

    afterEach((done) => {
        return async()
            .then(() => dbUtils.cleanUp(connectionString))
            .then(() => server.close(done));
    });

    describe('Sign up user', () => {
        it('should create', () => {
            const username = 'Coki' + parseInt(Math.random() * 1000, 10);
            const password = 'Sk0k1';
            return async()
                .then(() => authUtils.signUpUser(username, password))
                .then(() => authUtils.signInUser(username, password))
                .then(() => ui.getText('=' + username))
                .then((text) => {
                    expect(text).to.eql(username);
                });
        });
    });
});
