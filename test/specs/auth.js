const os = require('os');
const path = require('path');

const { expect } = require('chai');

const { getApp } = require('../../app/app');

const ui = require('./shared/ui.utils');

const authUtils = require('./shared/auth.utils');

const dbUtils = require('./shared/db.utils');

describe('Auth tests', () => {
    let port = null;
    let url = null;
    let app = null;
    let server = null;
    const connectionString =
        'mongodb://localhost/test-db-' + parseInt(Math.random() * 100);
    const logsDirectory =
        path.join(os.tmpdir(), 'app-selenium-logs' + Math.random());

    beforeEach((done) => {
        // get random port in range [3000, 4000)
        port = parseInt(Math.random() * 1000 + 3000);
        // port = 3001;
        url = 'http://localhost:' + port;
        return Promise.resolve()
            .then(() => getApp({
                connectionString,
                logsDirectory,
            }))
            .then((_app) => app = _app)
            .then(() => app.listen(port))
            .then((_server) => server = _server)
            .then(() => browser.url(url))
            .then(() => ui.setBrowser(browser))
            .then(done);
    });

    afterEach((done) => {
        return Promise.resolve()
            .then(() => dbUtils.cleanUp(connectionString))
            .then(() => server.close(done));
    });

    describe('Sign up user', () => {
        it('should create', () => {
            const username = 'Coki' + parseInt(Math.random() * 1000);
            const password = 'Sk0k1';
            return Promise.resolve()
                .then(() => authUtils.signUpUser(username, password))
                .then(() => authUtils.signInUser(username, password))
                .then(() => ui.getText('=' + username))
                .then((text) => {
                    expect(text).to.eql(username);
                });
        });
    });
});
