const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const getTodosData = require('./data/todos.data').getData;
const getAuthData = require('./data/auth.data').getData;

const initTodosRouter = require('./routes/todos/router').initRouter;
const initAuthRouter = require('./routes/auth/router').initRouter;

const { connect } = require('./db');

const flash = require('connect-flash');
const morgan = require('morgan');

module.exports = {
    getApp(config) {
        const app = express();

        app.set('view engine', 'pug');
        app.use(bodyParser.urlencoded({ extended: false }));

        app.use('/static', express.static(path.join(__dirname, 'static')));
        app.use('/libs', express.static(
            path.join(__dirname, '../node_modules')));
        app.use(cookieParser());
        app.use(flash());

        const logDirectory = config.logDirectory || path.join(__dirname, 'log');

        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

        const logStream = fs.createWriteStream(
            path.join(logDirectory, 'app.log'));

        // setup the logger
        app.use(morgan('combined', { stream: logStream }));

        return connect(config.connectionString)
            .then((db) => {
                const todosData = getTodosData(db);
                const authData = getAuthData(db);
                require('./auth')(app, authData, 'Purple Unicorn');
                const todosRouter = initTodosRouter(todosData);
                const usersRouter = initAuthRouter(authData);

                app.use('/todos', todosRouter);
                app.use('/auth', usersRouter);

                app.use('/', (req, res) => res.render('home'));
                return app;
            })
            .catch((err) => {
            });
    },
};
