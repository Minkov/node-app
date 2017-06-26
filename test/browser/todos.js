const { expect } = require('chai');

const async = require('../../utils/async');

const { setupDriver } = require('./utils/setup-driver');

const ui = require('./shared/ui.utils');

const authUtils = require('./shared/auth.utils');
const todoUtils = require('./shared/todo.utils');
const browsers = ['phantomjs'];

describe('TODO\'s tests', () => {
    let driver = null;
    const url = 'http://localhost:3002';

    beforeEach(() => {
        driver = setupDriver(url, ...browsers);

        const user = authUtils.getRandomUser();

        return driver.get(url)
            .then(() => ui.setDriver(driver))
            .then(() => authUtils.signUpUser(user.username, user.password))
            .then(() => authUtils.signInUser(user.username, user.password));
    });

    afterEach(() => {
        return driver.quit();
    });

    describe('expect creating a TODO', () => {
        it('to redirect to TODO details', () => {
            const text = 'It works!';
            return async()
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
                    texts.forEach((text) => {
                        expect(elTexts).to.include(text);
                    });
                });
        });
    });

    describe('expect clicking on a TODO', () => {
        it('to redirect to TODO details', () => {
            let text = null;
            return async()
                .then(() => todoUtils.createTODO('Sample TODO'))
                .then(() => ui.click('#nav-todos .toggle'))
                .then(() => ui.click('#nav-todos-all'))
                .then(() => ui.getText('.todo-item'))
                .then((_text) => {
                    text = _text;
                })
                .then(() => ui.click('.todo-item'))
                .then(() => Promise.all([
                    ui.getSelected('input[type="checkbox"]'),
                    ui.getText('h1'),
                ]))
                .then(([isSelected, elText]) => {
                    expect(isSelected).to.equal(false);
                    expect(elText).to.eq(text);
                });
        });
    });
});
