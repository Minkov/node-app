const express = require('express');
const bodyParser = require('body-parser');

const { getData } = require('./data/todos.data');

const { initRouter } = require('./routes/todos.routes');

const { connect } = require('./db');

module.exports = {
    getApp(config) {
        const app = express();

        app.set('view engine', 'pug');
        app.use(bodyParser.urlencoded({ extended: false }));

        return connect(config.connectionString)
            .then((db) => {
                const todosData = getData(db);
                const router = initRouter(todosData);

                app.use('/todos', router);

                app.use('/', (req, res) => res.render('home'));
                return app;
            });
    },
};
