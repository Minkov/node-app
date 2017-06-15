let browser = null;

const ui = require('./ui.utils');

const signUpUser = (username, password) => {
    return Promise.resolve()
        .then(() => ui.click('a=User'))
        .then(() => ui.click('a=Sign up'))
        .then(() => ui.setValue('input[name="username"]', username))
        .then(() => ui.setValue('input[name="password"]', password))
        .then(() => ui.click('.btn'));
};

const signInUser = (username, password) => {
    return Promise.resolve()
        .then(() => ui.click('a=User'))
        .then(() => ui.click('a=Sign in'))
        .then(() => ui.setValue('input[name="username"]', username))
        .then(() => ui.setValue('input[name="password"]', password))
        .then(() => ui.click('.btn'));
};

module.exports = {
    setBrowser(_browser) {
        browser = _browser;
        ui.setBrowser(browser);
    },
    signInUser, signUpUser,
};
