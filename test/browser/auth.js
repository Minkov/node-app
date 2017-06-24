const { expect } = require('chai');

const async = require('../../utils/async');

const { setupDriver } = require('./utils/setup-driver');

const { Server } = require('./utils/setup-server');

const ui = require('./shared/ui.utils');

const authUtils = require('./shared/auth.utils');

describe('Sample test', () => {
    const url = 'http://localhost:3002';
    let driver = null;

    beforeEach(() => {
        driver = setupDriver(url, 'firefox');

        return driver.get(url)
            .then(() => {
                return ui.setDriver(driver);
            });
    });

    afterEach(() => {
        return driver.quit();
    });

    describe('Sign up user', () => {
        it('should create', () => {
            const username = 'Coki' + parseInt(Math.random() * 1000, 10);
            const password = 'Sk0k1';
            return async()
                .then(() => authUtils.signUpUser(username, password))
                .then(() => authUtils.signInUser(username, password))
                .then(() => ui.getText('#nav-user .toggle'))
                .then((text) => {
                    expect(text).to.eql(username);
                });
        });
    });
});
