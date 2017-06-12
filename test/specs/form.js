const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const { getApp } = require('../../app/app');

describe('Form test', () => {
    // get random port in range [3000, 4000)
    const port = parseInt(Math.random() * 1000 + 3000);
    const url = 'http://localhost:' + port;
    let server = null;
    let app = null;
    const connectionString = 'mongodb://localhost/test-db';

    beforeEach((done) => {
        getApp({ connectionString })
            .then((_app) => app = _app)
            .then(() => app.listen(port, done))
            .then((_server) => server = _server);
    });

    afterEach((done) => {
        MongoClient.connect(connectionString)
            .then((db) => {
                return db.collections();
            })
            .then((collections) => {
                collections.forEach((collection) => {
                    collection.remove({});
                });
            })
            .then(() => {
                server.close(done);
                done();
            });
    });

    it('Should create an element', () => {
        const text = 'It works!';

        browser.url(url + '/form');

        const tbText = $('#tb-text');
        tbText.setValue(text);

        browser.click('#btn-save');

        browser.url(url);
        const item = $('a');

        expect(item.getText()).to.eq(text);
    });
});
