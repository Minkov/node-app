const { getData } = require('../../../app/data/todos.data');
const sinon = require('sinon');

const { expect } = require('chai');

describe('TODO\' controller', () => {
    let data = null;

    const db = {
        collection: () => { },
    };

    let items = [];


    const find = () => {
        return {
            toArray() {
                return Promise.resolve(items);
            },
        };
    };


    const findOne = (props) => {
        let id = props._id;
        const item = items.find((i) => i.id === id);
        return Promise.resolve(item || null);
    };

    describe('expect getAll()', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });

            data = getData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to return empty array, when no todos',
            (done) => {
                items = [];
                data.getAll()
                    .then((todos) => {
                        expect(todos).to.eql(items);
                        done();
                    });
            });

        it('to return non-empty array, when there are todos',
            (done) => {
                items = [{
                    _id: 'some-id',
                    text: 'Test TODO',
                    isDone: false,
                }];

                data.getAll()
                    .then((todos) => {
                        expect(todos).to.eql(items);
                        done();
                    });
            });
    });

    describe('expect getById()', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { findOne };
            });

            data = getData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to return null, when no todos', (done) => {
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
