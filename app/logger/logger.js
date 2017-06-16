const fs = require('fs');

const morgan = require('morgan');

const attachTo = (app) => {
    const logDirectory = config.logDirectory || path.join(__dirname, 'log');

    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    const logStream = fs.createWriteStream(
        path.join(logDirectory, 'app.log'));

    app.use(morgan('combined', { stream: logStream }));
};

module.exports = { attachTo };
