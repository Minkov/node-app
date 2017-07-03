/* eslint "no-unused-expressions": 0 */

const { getData } = require('../../../../app/data/auth.data');
const sinon = require('sinon');

const { expect } = require('chai');

describe('Users\' data getById()', () => {
    let data = null;

    const db = {
        collection: () => { },
    };

    const users = [];

    const findOne = (props) => {
        const id = props._id;
        const item = users.find((i) => i.id === id);
        return Promise.resolve(item || null);
    };

    describe('When id is invalid', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { findOne };
            });
            data = getData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return null', (done) => {
            const { ObjectID } = require('mongodb');
            const id = new ObjectID().toHexString();
            data.getById(id)
                .then((item) => {
                    expect(item).to.be.null;
                    done();
                });
        });
    });
});
