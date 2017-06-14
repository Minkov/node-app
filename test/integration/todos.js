const request = require('supertest');

const { MongoClient } = require('mongodb');

const { getApp } = require('../../app/app');

const { expect } = require('chai');

describe('Test 1', () => {
    let app = null;
    const connectionString = 'mongodb://localhost/test-db';

    beforeEach((done) => {
        getApp({ connectionString })
            .then((_app) => app = _app)
            .then(() => done());
    });

    afterEach((done) => {
        MongoClient.connect(connectionString)
            .then((db) => {
                return db.collections();
            })
            .then((collections) => {
                collections.forEach((collection) => {
                    collection.remove({});
                }); 401;
            })
            .then(() => {
                done();
            });
    });

    it('Simple get', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('Simple post', (done) => {
        request(app)
            .post('/todos')
            .type('form')
            .send({
                text: 'It works',
            })
            .expect(302)
            .end((err, res) => {
                expect(res.text).to.contain('/auth/sign-in');
                if (err) return done(err);
                done();
            });
    });
});
