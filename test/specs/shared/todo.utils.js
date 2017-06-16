const ui = require('./ui.utils');

const async = require('../../../utils/async');

const createTODO = (text) => {
    return async()
        .then(() => ui.click('a=TODOs'))
        .then(() => ui.click('a=Create'))
        .then(() => ui.setValue('input[name="text"]', text))
        .then(() => ui.click('button'));
};

module.exports = { createTODO };
