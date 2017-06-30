/* eslint "no-unused-expressions": 0 */

const { getController } = require('../../../../app/routers/todos/controller');

const sinon = require('sinon');

const { expect } = require('chai');
const { getRequestMock, getResponseMock } = require('../../mocks/req-res');

describe('TODO\' controller getDetails()', () => {
    let controller = null;

    let req = null;
    let res = null;

    const data = {
        getById: () => { },
    };
    let item = null;

    beforeEach(() => {
        item = {
            id: 1,
            text: 'This is the item',
        };

        controller = getController(data);

        req = getRequestMock({ params: { id: item.id } });
        res = getResponseMock();
    });

    describe('when todo is found', () => {
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

    describe('when todo is not found', () => {
        beforeEach(() => {
            sinon.stub(data, 'getById')
                .callsFake(() => {
                    return Promise.resolve(null);
                });
            req = getRequestMock({ params: { id: item.id } });
            res = getResponseMock();
        });

        afterEach(() => {
            data.getById.restore();
        });

        it('expect to redirect to /todos/all', () => {
            return controller.getDetails(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.eql('/todos/all');
                });
        });
    });
});
