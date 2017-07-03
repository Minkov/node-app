const request = require('supertest');

const { getApp } = require('../../app/app');

const { expect } = require('chai');

const { cleanUp } = require('../shared/db.utils');

const async = require('../../utils/async');

describe('Test 1', () => {
    let app = null;
    const connectionString = 'mongodb://localhost/test-db';

    beforeEach((done) => {
        async()
            .then(() => getApp({ connectionString }))
            .then((_app) => {
                app = _app;
            })
            .then(done);
    });

    afterEach((done) => {
        cleanUp(connectionString)
            .then(() => done());
    });

    describe('is NOT authenticated', () => {
        it('GET /todos', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

         it('GET /todos/1', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('POST /todos', (done) => {
            request(app)
                .post('/todos')
                .type('form')
                .send({
                    text: 'It works',
                })
                .expect(302)
                .end((err, res) => {
                    expect(res.text).to.contain('/auth/sign-in');
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

     describe('is authenticated', () => {
        it('GET /todos', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('POST /todos', (done) => {
            request(app)
                .post('/todos')
                .type('form')
                .send({
                    text: 'It works',
                })
                .auth('Doncho', '123456qw')
                .expect(302)
                .end((err, res) => {
                    expect(res.text).to.contain('/auth/sign-in');
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('GET /todos/form', () => {
            request(app)
                .get('/todos/form')
                .withCredentials()
                .expect(200);
        });
    });
});
