const { expect } = require('chai');

const { MongoClient } = require('mongodb');

const { getApp } = require('../../app/app');

const ui = require('./shared/ui.utils');
const authUtils = require('./shared/auth.utils');

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
            .then(() => ui.setBrowser(browser))
            .then(() => authUtils.signUpUser('Coki', 'Skoki'))
            .then(() => authUtils.signInUser('Coki', 'Skoki'))
            .then(done);
    });

    afterEach((done) => {
        MongoClient.connect(connectionString)
            .then((db) => db.collections())
            .then((collections) =>
                collections.forEach((collection) => collection.remove({})))
            .then(() => server.close(done));
    });

    const createTODO = (text) => {
        return Promise.resolve()
            .then(() => ui.click('#nav-btn-todos'))
            .then(() => ui.click('#btn-subnav-create'))
            .then(() => ui.waitFor('#tb-text'))
            .then(() => ui.setValue('#tb-text', text))
            .then(() => ui.click('#btn-save'));
    };

    describe('expect creating a TODO', () => {
        it('to redirect to TODO details', () => {
            const text = 'It works!';

            return Promise.resolve()
                .then(() => createTODO(text))
                .then(() => Promise.all([
                    ui.waitFor('*[type=checkbox]')
                        .then(() => browser.isSelected('*[type=checkbox]')),
                    ui.waitFor('h1')
                        .then(() => ui.getText('h1')),
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
                .then(() => ui.click('#nav-btn-todos'))
                .then(() => ui.click('#btn-subnav-all'))
                .then(() => ui.getText('.todo-item'))
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
                .then(() => ui.click('#nav-btn-todos'))
                .then(() => ui.click('#btn-subnav-all'))
                .then(() => ui.click('=' + text))
                .then(() => Promise.all([
                    ui.waitFor('*[type=checkbox]')
                        .then(() => browser.isSelected('*[type=checkbox]')),
                    ui.waitFor('h1')
                        .then(() => ui.getText('h1')),
                ]))
                .then(([isSelected, elText]) => {
                    expect(isSelected).to.equal(false);
                    expect(elText).to.eq(text);
                });
        });
    });
});
