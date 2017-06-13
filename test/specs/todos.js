const { expect } = require('chai');

const { MongoClient } = require('mongodb');

const { getApp } = require('../../app/app');

describe('TODO\'s tests', () => {
    // get random port in range [3000, 4000)
    const port = parseInt(Math.random() * 1000 + 3000);
    const url = 'http://localhost:' + port;
    let server = null;
    let app = null;
    const connectionString = 'mongodb://localhost/test-db-' + parseInt(Math.random() * 100);

    beforeEach((done) => {
        getApp({ connectionString })
            .then((_app) => app = _app)
            .then(() => app.listen(port, done))
            .then((_server) => server = _server)
            .then(() => browser.url(url));
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
        browser.waitForEnabled(selector);
        return $(selector);
    }

    const waitSeconds = (seconds) => {
        return new Promise((resolve) => {
            setTimeout(resolve, seconds * 1000);
        });
    };

    const selectByText = (text) => {
        return new Promise((resolve) => {
            const f = () => {
                try {
                    browser.waitForExist('=' + text);
                    const element = $('=' + text);
                    const text = element.getText();

                    return resolve(element);
                } catch (err) {
                    return waitSeconds(0.1)
                        .then(f)
                        .then(resolve);
                }
            };

            f(resolve);
            // setTimeout(f, 100);
        });
    };

    const click = (selector) => {
        select(selector)
            .click();
    };

    const clickByText = (text) => {
        return selectByText(text)
            .then((element) => element.click());
    };

    const createTODO = (text) => {
        click('#nav-btn-todos');
        click('#btn-subnav-create');
        select('#tb-text')
            .setValue(text);
        click('#btn-save');
    };

    // describe('expect creating a TODO', () => {
    //     it('to redirect to TODO details', () => {
    //         const text = 'It works!';

    //         createTODO(text);

    //         const h1 = select('h1');
    //         const check = select('*[type=checkbox]');

    //         expect(h1.getText()).to.eq(text);
    //         expect(check.isSelected()).to.equal(false);
    //     });
    // });

    describe('expect todos to be listed', () => {
        it('when they are created', (done) => {
            const count = 1;
            const texts = Array.from({ length: count })
                .map((_, i) => 'Todo' + (i + 1));

            texts.forEach((text) => createTODO(text));

            click('#nav-btn-todos');
            click('#btn-subnav-all');

            Promise.all(
                texts.map(
                    (text) => {
                        console.log(' --- HERE ---');
                        return selectByText(text)
                            .then((a) => a.getText() + 1);
                    }
                ))
                .then((elTexts) => {
                    expect(elTexts).to.eq(texts);
                })
                .catch(done);
        });
    });

    // describe('expect clicking on a TODO', () => {
    //     it('to redirect to TODO details', (done) => {
    //         const text = 'SampleTODO';
    //         createTODO(text);

    //         click('#nav-btn-todos');
    //         click('#btn-subnav-all');

    //         clickByText(text)
    //             .then(() => {
    //                 const h1 = select('h1');
    //                 const check = select('*[type=checkbox]');
    //                 expect(check.isSelected()).to.equal(false);

    //                 expect(h1.getText()).to.eq(text);
    //             })
    //             .then(done);
    //     });

    //     it('to redirect to TODO details, when many todos', (done) => {
    //         const text = 'SampleTODO';
    //         createTODO('ANOTHERTODO');
    //         createTODO(text);

    //         click('#nav-btn-todos');
    //         click('#btn-subnav-all');

    //         clickByText(text)
    //             .then(() => {
    //                 const h1 = select('h1');
    //                 const check = select('*[type=checkbox]');
    //                 expect(check.isSelected()).to.equal(false);

    //                 expect(h1.getText()).to.eq(text);
    //             });
    //     });
    // });
});
