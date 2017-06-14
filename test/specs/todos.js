const { expect } = require('chai');

const { MongoClient } = require('mongodb');

const { getApp } = require('../../app/app');

describe('TODO\'s tests', () => {
    // get random port in range [3000, 4000)
    let port = null;
    let url = null;
    let server = null;
    let app = null;
    const connectionString = 'mongodb://localhost/test-db-' + parseInt(Math.random() * 100);

    beforeEach((done) => {
        port = parseInt(Math.random() * 1000 + 3000);
        url = 'http://localhost:' + port;
        return getApp({ connectionString })
            .then((_app) => app = _app)
            .then(() => app.listen(port))
            .then((_server) => server = _server)
            .then(() => browser.url(url))
            .then(done);
    });

    afterEach((done) => {
        MongoClient.connect(connectionString)
            .then((db) => db.collections())
            .then((collections) =>
                collections.forEach((collection) => collection.remove({})))
            .then(() => server.close(done));
    });

    const waitFor = (selector) => {
        try {
            browser.waitForExist(selector);
            // browser.waitForVisible(selector);
            browser.getText(selector);
            return Promise.resolve();
        } catch (err) {
            return waitFor(selector);
        }
    };

    const getText = (selector) => {
        return Promise.resolve()
            .then(() => waitFor(selector))
            .then(() => browser.getText(selector));
    };

    const setValue = (selector, value) => {
        return Promise.resolve()
            .then(() => waitFor(selector))
            .then(() => browser.setValue(selector, value));
    };

    const click = (selector) => {
        return Promise.resolve()
            .then(() => waitFor(selector))
            .then(() => browser.click(selector));
    };

    const createTODO = (text) => {
        return Promise.resolve()
            .then(() => click('#nav-btn-todos'))
            .then(() => click('#btn-subnav-create'))
            .then(() => waitFor('#tb-text'))
            .then(() => setValue('#tb-text', text))
            .then(() => click('#btn-save'));
    };

    describe('expect creating a TODO', () => {
        it('to redirect to TODO details', () => {
            const text = 'It works!';

            return Promise.resolve()
                .then(() => createTODO(text))
                .then(() => Promise.all([
                    waitFor('*[type=checkbox]')
                        .then(() => browser.isSelected('*[type=checkbox]')),
                    waitFor('h1')
                        .then(() => getText('h1')),
                ]))
                .then(([isSelected, elText]) => {
                    expect(isSelected).to.equal(false);
                    expect(elText).to.eq(text);
                });
        });
    });

    describe('expect todos to be listed', () => {
        it('when they are created', () => {
            const length = 5;
            const texts = Array.from({ length })
                .map((_, index) => 'Todo ' + (index + 1));

            let todoPromomises = texts.reduce((p, text) =>
                p.then(() => createTODO(text)), Promise.resolve());

            return Promise.resolve()
                .then(() => todoPromomises)
                .then(() => click('#nav-btn-todos'))
                .then(() => click('#btn-subnav-all'))
                .then(() => getText('.todo-item'))
                .then((elTexts) => {
                    expect(elTexts).to.eql(texts);
                });
        });
    });

    describe('expect clicking on a TODO', () => {
        it('to redirect to TODO details', () => {
            const text = 'SampleTODO';
            return Promise.resolve()
                .then(() => createTODO(text))
                .then(() => click('#nav-btn-todos'))
                .then(() => click('#btn-subnav-all'))
                .then(() => click('=' + text))
                .then(() => Promise.all([
                    waitFor('*[type=checkbox]')
                        .then(() => browser.isSelected('*[type=checkbox]')),
                    waitFor('h1')
                        .then(() => getText('h1')),
                ]))
                .then(([isSelected, elText]) => {
                    expect(isSelected).to.equal(false);
                    expect(elText).to.eq(text);
                });
        });
    });
});
