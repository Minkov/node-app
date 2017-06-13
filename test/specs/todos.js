const { expect } = require('chai');

const { MongoClient } = require('mongodb');

const { getApp } = require('../../app/app');

describe('TODO\'s tests', () => {
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
            .then((db) => db.collections())
            .then((collections) =>
                collections.forEach((collection) => collection.remove({})))
            .then(() => server.close(done));
    });

    const select = (selector) => {
        browser.waitForExist(selector);
        return $(selector);
    };

    // const selectByText = (text) => {
    //     browser.waitForExist('a');
    //     return browser.getText('=' + text);
    // };

    const click = (selector) => {
        select(selector)
            .click();
    };

    const clickByText = (text) => {
        browser.element('a').click('*=' + text);
    };

    const createTODO = (text) => {
        click('#nav-btn-todos');
        click('#btn-subnav-create');
        select('#tb-text')
            .setValue(text);

        click('#btn-save');
    };

    describe('expect creating a TODO', () => {
        it('to redirect to TODO details', () => {
            const text = 'It works!';
            browser.url(url);

            createTODO(text);

            const h1 = select('h1');
            const check = select('*[type=checkbox]');

            expect(h1.getText()).to.eq(text);
            expect(check.isSelected()).to.equal(false);
        });
    });

    describe('expect clicking on a TODO', () => {
        it('to redirect to TODO details', (done) => {
            const text = 'Sample TODO';
            createTODO(text);

            click('#nav-btn-todos');
            click('#btn-subnav-all');
            clickByText(text);

            const h1 = select('h1');
            const check = select('*[type=checkbox]');
            expect(check.isSelected()).to.equal(false);

            expect(h1.getText()).to.eq(text);
        });
    });
});
