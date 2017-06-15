const ui = require('./ui.utils');

const createTODO = (text) => {
    return Promise.resolve()
        .then(() => ui.click('a=TODOs'))
        .then(() => ui.click('a=Create'))
        .then(() => ui.setValue('input[name="text"]', text))
        .then(() => ui.click('button'));
};

module.exports = { createTODO };
