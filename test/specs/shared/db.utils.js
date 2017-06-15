const { MongoClient } = require('mongodb');

const cleanUp = (connectionString) => {
    return Promise.resolve()
        .then(() => MongoClient.connect(connectionString))
        .then((db) => db.dropDatabase());
};

module.exports = { cleanUp };
