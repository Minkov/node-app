let browser = null;

const ui = require('./ui.utils');
const async = require('../../../utils/async');

const signUpUser = (username, password) => {
    return async()
        .then(() => ui.click('#nav-user .toggle'))
        .then(() => ui.click('#nav-sign-up'))
        .then(() => ui.setValue('input[name="username"]', username))
        .then(() => ui.setValue('input[name="password"]', password))
        .then(() => ui.click('form button'));
};

const signInUser = (username, password) => {
    return async()
        .then(() => ui.click('#nav-user .toggle'))
        .then(() => ui.click('#nav-sign-in'))
        .then(() => ui.setValue('input[name="username"]', username))
        .then(() => ui.setValue('input[name="password"]', password))
        .then(() => ui.click('form button'));
};

module.exports = {
    setBrowser(_browser) {
        browser = _browser;
        ui.setBrowser(browser);
    },
    signInUser, signUpUser,
};
