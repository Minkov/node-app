const { expect } = require('chai');

const async = require('../../utils/async');
const { waitSeconds } = require('../../utils/wait');

const { setupDriver } = require('./utils/setup-driver');

const { Server } = require('./utils/setup-server');

const ui = require('./shared/ui.utils');

const authUtils = require('./shared/auth.utils');
const todoUtils = require('./shared/todo.utils');

describe('TODO\'s tests', () => {
    let server = null;
    let driver = null;
    let url = null;

    // run it once before tests
    beforeEach((done) => {
        server = new Server();
        async()
            .then(() => {
                return server.start();
            })
            .then(() => {
                url = server.url;
                return url;
            })
            .then(() => {
                return setupDriver(url, 'firefox');
            })
            .then((_driver) => {
                driver = _driver;
            })
            .then(() => {
                return driver.get(url);
            })
            .then(() => {
                return ui.setDriver(driver);
            })
            .then(() => authUtils.signUpUser('Coki', 'Sk0k1'))
            .then(() => authUtils.signInUser('Coki', 'Sk0k1'))
            .then((done));
    });

    afterEach((done) => {
        driver.quit()
            .then(() => server.stop())
            .then(done);
    });

    describe.skip('expect creating a TODO', () => {
        it('to redirect to TODO details', () => {
            const text = 'It works!';
            return async()
                .then(() => {
                    return async()
                        .then(() => authUtils.signUpUser('C0ki', 'Sk0k1'))
                        .then(() => authUtils.signInUser('C0ki', 'Sk0k1'));
                })
                .then(() => todoUtils.createTODO(text))
                .then(() => Promise.all([
                    ui.getSelected('input'),
                    ui.getText('h1'),
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

            return async()
                .then(() => {
                    return texts.reduce((p, text) => {
                        return p.then(() =>
                            todoUtils.createTODO(text));
                    }, async());
                })
                .then(() => ui.click('#nav-todos .toggle'))
                .then(() => ui.click('#nav-todos-all'))
                .then(() => ui.getTexts('.todo-item'))
                .then((elTexts) => {
                    expect(elTexts).to.eql(texts);
                });
        });
    });

    describe.skip('expect clicking on a TODO', () => {
        it('to redirect to TODO details', () => {
            const text = 'SampleTODO';
            return async()
                .then(() => authUtils.signUpUser('C0ki', 'Sk0k1'))
                .then(() => authUtils.signInUser('C0ki', 'Sk0k1'))
                .then(() => todoUtils.createTODO(text))
                .then(() => ui.click('a=TODOs'))
                .then(() => ui.click('a=All'))
                .then(() => ui.click('=' + text))
                .then(() => Promise.all([
                    ui.waitFor('*[type=checkbox]')
                        .then(() => driver.isSelected('*[type=checkbox]')),
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
