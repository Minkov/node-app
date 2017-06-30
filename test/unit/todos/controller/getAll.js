/* eslint "no-unused-expressions": 0 */

const { getController } = require('../../../../app/routers/todos/controller');

const sinon = require('sinon');

const { expect } = require('chai');
const { getRequestMock, getResponseMock } = require('../../mocks/req-res');

describe('TODO\' controller getAll()', () => {
    let controller = null;

    let req = null;
    let res = null;

    const data = {
        getAll: () => { },
    };

    beforeEach(() => {
        controller = getController(data);
    });

    describe('expect to render `todos/all` view', () => {
        let items = [];

        beforeEach(() => {
            sinon.stub(data, 'getAll')
                .callsFake(() => {
                    return Promise.resolve(items);
                });
            req = getRequestMock();
            res = getResponseMock();
        });

        afterEach(() => {
            data.getAll.restore();
        });

        it('when there are todos', () => {
            items = ['1', '2', '3'];

            return controller.getAll(req, res)
                .then(() => {
                    expect(res.viewName).to.eql('todos/all');
                    expect(res.model).to.eql({ context: items });
                });
        });

        it('when there no are todos', () => {
            items = [];
            return controller.getAll(req, res)
                .then(() => {
                    expect(res.viewName).to.eql('todos/all');
                    expect(res.model).to.eql({ context: items });
                });
        });
    });
});
