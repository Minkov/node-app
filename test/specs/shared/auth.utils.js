let browser = null;

const ui = require('./ui.utils');

const signUpUser = (username, password) => {
    return Promise.resolve()
        .then(() => ui.click('=' + 'User'))
        .then(() => ui.click('=' + 'Sign up'))
        .then(() => ui.setValue('*[name*=username]', username))
        .then(() => ui.setValue('*[name*=password]', password))
        .then(() => ui.click('button'));
};

const signInUser = (username, password) => {
    return Promise.resolve()
        .then(() => ui.click('=' + 'User'))
        .then(() => ui.click('=' + 'Sign in'))
        .then(() => ui.setValue('*[name*=username]', username))
        .then(() => ui.setValue('*[name*=password]', password))
        .then(() => ui.click('button'));
};

module.exports = {
    setBrowser(_browser) {
        browser = _browser;
        ui.setBrowser(browser);
    },
    signInUser, signUpUser,
};
