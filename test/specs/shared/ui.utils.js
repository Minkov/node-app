let browser = null;

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

const getText = (selector) => {
    return Promise.resolve()
        .then(() => waitFor(selector))
        .then(() => browser.getText(selector));
};

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

module.exports = {
    setBrowser(_browser) {
        browser = _browser;
    },
    waitFor, getText, setValue, click,
};
