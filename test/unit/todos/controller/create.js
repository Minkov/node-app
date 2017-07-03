/* eslint "no-unused-expressions": 0 */

const { getController } = require('../../../../app/routers/todos/controller');

const sinon = require('sinon');

const { expect } = require('chai');
const { getRequestMock, getResponseMock } = require('../../mocks/req-res');

describe('TODO\' controller create()', () => {
    let controller = null;

    let req = null;
    let res = null;

    const data = {
        create: () => { },
    };

    beforeEach(() => {
        controller = getController(data);
    });

    describe('when TODO is available', () => {
        let todo = null;

        describe('and is valid', () => {
            beforeEach(() => {
                todo = {
                    id: 1,
                    text: 'TODO text',
                };

                req = getRequestMock({ body: todo });
                res = getResponseMock();

                sinon.stub(data, 'create')
                    .callsFake(() => {
                        return Promise.resolve(todo);
                    });
            });

            afterEach(() => {
                todo = null;
                req = null;
                res = null;
                data.create.restore();
            });

            it('expect to redirect to `/todos/1`', () => {
                return controller.create(req, res)
                    .then(() => {
                        expect(res.redirectUrl)
                            .to
                            .eql('/todos/' + todo.id);
                    });
            });
        });
        describe('and is invalid', () => {
            beforeEach(() => {
                todo = {
                    id: 1,
                    text: 't',
                };

                req = getRequestMock({ body: todo });
                res = getResponseMock();

                sinon.stub(data, 'create')
                    .callsFake(() => {
                        return Promise.resolve(todo);
                    });
            });

            afterEach(() => {
                todo = null;
                req = null;
                res = null;
                data.create.restore();
            });

            it('expect to redirect to `/todos/form`', () => {
                return controller.create(req, res)
                    .then(() => {
                        expect(res.redirectUrl)
                            .to
                            .eql('/todos/form');
                    });
            });
        });
    });

    describe('when TODO is not available', () => {
        beforeEach(() => {
            req = getRequestMock();
            res = getResponseMock();
            sinon.stub(data, 'create')
                .callsFake(() => {
                    return Promise.resolve(null);
                });
        });

        afterEach(() => {
            data.create.restore();
        });

        it('expect to redirect to /todos/form', () => {
            return controller.create(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.eql('/todos/form');
                });
        });
    });
});
