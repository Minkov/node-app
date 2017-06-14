const { expect } = require('chai');

const { MongoClient } = require('mongodb');

const { getApp } = require('../../app/app');

const ui = require('./shared/ui.utils');

const authUtils = require('./shared/auth.utils');

describe('Auth tests', () => {
    // get random port in range [3000, 4000)
    let port = null;
    let url = null;
    let server = null;
    let app = null;
    const connectionString = 'mongodb://localhost/test-db-' + parseInt(Math.random() * 100);

    beforeEach((done) => {
        port = parseInt(Math.random() * 1000 + 3000);
        url = 'http://localhost:' + port;
        return getApp({ connectionString })
            .then((_app) => app = _app)
            .then(() => app.listen(port))
            .then((_server) => server = _server)
            .then(() => browser.url(url))
            .then(() => ui.setBrowser(browser))
            .then(done);
    });

    afterEach((done) => {
        MongoClient.connect(connectionString)
            .then((db) => db.collections())
            .then((collections) =>
                collections.forEach((collection) => collection.remove({})))
            .then(() => server.close(done));
    });

    describe('Sign up user', () => {
        it('should create', () => {
            const username = 'Coki';
            const password = 'Sk0k1';
            return Promise.resolve()
                .then(() => authUtils.signUpUser(username, password))
                .then(() => authUtils.signInUser(username, password))
                .then(() => ui.waitFor('=' + username))
                .then(() => ui.getText('=' + username))
                .then((text) => {
                    expect(text).to.eql(username);
                });
        });
    });
});
