const { expect } = require('chai');

const async = require('../../utils/async');

const { setupDriver } = require('./utils/setup-driver');

const { Server } = require('./utils/setup-server');

const ui = require('./shared/ui.utils');

const authUtils = require('./shared/auth.utils');

describe('Sample test', () => {
    let server = null;
    let driver = null;
    let url = null;

    // run it once before tests
    beforeEach(() => {
        server = new Server();
        return async()
            .then(() => server.start())
            .then(() => {
                url = server.url;
            })
            .then(() => setupDriver(url, 'chrome'))
            .then((_driver) => {
                driver = _driver;
            })
            .then(() => {
                driver.get(url);
            })
            .then(() => {
                ui.setDriver(driver);
            });
    });

    afterEach(() => {
        return driver.quit()
            .then(() => {
                server.stop();
            });
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
