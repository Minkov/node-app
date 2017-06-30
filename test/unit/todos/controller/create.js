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
        const todo = {
            id: 1,
            text: 'TODO text',
        };

        describe('and is valid', () => {
            req = getRequestMock({ body: todo });
            res = getResponseMock();

            beforeEach(() => {
                sinon.stub(data, 'create')
                    .callsFake(() => {
                        return Promise.resolve(todo);
                    });
            });

            afterEach(() => {
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
