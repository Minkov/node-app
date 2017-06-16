const fs = require('fs');
const path = require('path');

const initData = (db) => {
    const data = fs.readdirSync(__dirname)
        .filter((file) => file.includes('.data'))
        .reduce((data, file) => {
            const dataName = file.substr(0, file.indexOf('.data'));
            const dataModulePath = path.join(__dirname, file);
            data[dataName] = require(dataModulePath).getData(db);
            return data;
        }, {});
    return data;
};

module.exports = { initData };
