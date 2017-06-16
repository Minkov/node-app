let browser = null;

const async = require('../../../utils/async');

const waitFor = (selector) => {
    try {
        // browser.waitForExist(selector);
        // browser.waitForVisible(selector);
        return browser.waitUntil(() => {
            return browser.waitForExist(selector);
        }, 5000, `Element with selector ${selector} not found`)
            .then(() => browser.getText(selector))
            .then(() => true);
    } catch (err) {
        return waitFor(selector);
    }
};

const getText = (selector) => {
    return async()
        .then(() => waitFor(selector))
        .then(() => browser.getText(selector));
};

const setValue = (selector, value) => {
    return async()
        .then(() => waitFor(selector))
        .then(() => browser.setValue(selector, value));
};

const click = (selector) => {
    return async()
        .then(() => waitFor(selector))
        .then(() => browser.click(selector));
};

module.exports = {
    setBrowser(_browser) {
        browser = _browser;
    },
    waitFor, getText, setValue, click,
};
