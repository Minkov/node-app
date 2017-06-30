/* eslint "no-unused-expressions": 0 */

const { getController } = require('../../../../app/routers/todos/controller');

const sinon = require('sinon');

const { expect } = require('chai');
const { getRequestMock, getResponseMock } = require('../../mocks/req-res');

describe.skip('TODO\' controller create()', () => {
    let controller = null;

    let req = null;
    let res = null;

    const data = {
        create: () => { },
    };

    beforeEach(() => {
        controller = getController(data);

        req = getRequestMock({ params: {} });
        res = getResponseMock();
    });

    describe('when TODO is available', () => {
        const todo = {
            id: 1,
            text: 'TODO text',
        };

        describe('and is valid', () => {
            beforeEach(() => {
                sinon.stub(data, 'create')
                    .callsFake(() => {
                        return Promise.resolve(todo);
                    });
            });

            afterEach(() => {
                data.create.restore();
            });

            it('expect to redirect to `/todos/details/1`', () => {
                return controller.create(req, res)
                    .then(() => {
                        expect(res.viewName).to.eql('todos/details');
                        expect(res.model).to.eql({ context: item });
                    });
            });
        });
    });

    describe('when TODO is not available', () => {
        describe('expect to /todos/form', () => {
            beforeEach(() => {
                sinon.stub(data, 'getById')
                    .callsFake(() => {
                        return Promise.resolve(item);
                    });
            });

            afterEach(() => {
                data.getById.restore();
            });

            it('expect to render `todos/details` view', () => {
                return controller.getDetails(req, res)
                    .then(() => {
                        expect(res.viewName).to.eql('todos/details');
                        expect(res.model).to.eql({ context: item });
                    });
            });
        });
    });

});
