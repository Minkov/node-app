const express = require('express');
const bodyParser = require('body-parser');
const { initRouter } = require('./routes/todos.routes');

module.exports = {
    getApp(config) {
        const app = express();
        const { MongoClient } = require('mongodb');

        app.set('view engine', 'pug');
        app.use(bodyParser.urlencoded({ extended: false }));
        return MongoClient.connect(config.connectionString)
            .then((db) => {
                const router = initRouter(db);
                app.use('/', router);
                return app;
            });
    },
};
