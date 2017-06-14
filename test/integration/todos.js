const request = require('supertest');

const { MongoClient } = require('mongodb');

const { getApp } = require('../../app/app');

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
                });
            })
            .then(() => {
                done();
            });
    });

    it('simple get', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('simple get', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it.skip('Simple WRONG post', (done) => {
        request(app)
            .post('/todos')
            .type('form')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it.skip('Simple post', (done) => {
        request(app)
            .post('/todos')
            .type('form')
            .send({
                text: 'It works',
            })
            .expect(302)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});
