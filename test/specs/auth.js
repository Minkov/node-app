// const { expect } = require('chai');

const { MongoClient } = require('mongodb');

const { getApp } = require('../../app/app');

const waitSeconds = (seconds) => {
    return new Promise((resolve) =>
        setTimeout(resolve, seconds * 1000)
    );
};

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
            .then(done);
    });

    afterEach((done) => {
        MongoClient.connect(connectionString)
            .then((db) => db.collections())
            .then((collections) =>
                collections.forEach((collection) => collection.remove({})))
            .then(() => server.close(done));
    });

    const waitFor = (selector) => {
        try {
            browser.waitForExist(selector);
            // browser.waitForVisible(selector);
            browser.getText(selector);
            return Promise.resolve();
        } catch (err) {
            return waitFor(selector);
        }
    };

    // const getText = (selector) => {
    //    return Promise.resolve()
    //        .then(() => waitFor(selector))
    //        .then(() => browser.getText(selector));
    // };

    const setValue = (selector, value) => {
        return Promise.resolve()
            .then(() => waitFor(selector))
            .then(() => browser.setValue(selector, value));
    };

    const click = (selector) => {
        return Promise.resolve()
            .then(() => waitFor(selector))
            .then(() => browser.click(selector));
    };

    const signUpUser = (username, password) => {
        return Promise.resolve()
            .then(() => click('=' + 'Sign up'))
            .then(() => setValue('*[name=username]', username))
            .then(() => setValue('*[name=username]', password))
            .then(() => click('button'));
    };

    const signInUser = (username, password) => {
        return Promise.resolve()
            .then(() => click('=' + 'Sign in'))
            .then(() => setValue('*[name=username]', username))
            .then(() => setValue('*[name=username]', password))
            .then(() => click('button'));
    };

    describe('Sign up user', () => {
        it('should create', () => {
            return Promise.resolve()
                .then(() => signUpUser('Coki', 'Skoki'))
                .then(() => signInUser('Coki', 'Skoki'))
                .then(() => waitSeconds(2));
        });
    });
});
