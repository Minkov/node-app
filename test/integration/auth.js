const request = require('supertest');

const { MongoClient } = require('mongodb');

const { getApp } = require('../../app/app');

const { expect } = require('chai');

const { cleanUp } = require('../shared/db.utils');

const async = require('../../utils/async');

const signUpUser = (agent, user) => {
    return new Promise((resolve, reject) => {
        agent.post('/auth/sign-up')
            .type('form')
            .send(user)
            .end((err, res) => {
                resolve(res);
            });
    });
};

const signInUser = (agent, user) => {
    return new Promise((resolve, reject) => {
        agent.post('/auth/sign-in')
            .type('form')
            .send(user)
            .end((err, res) => {
                resolve(res);
            });
    });
};

describe('Integration /auth', () => {
    let app = null;
    const connectionString = 'mongodb://localhost/test-db';

    beforeEach(() => {
        return getApp({ connectionString })
            .then((_app, _todos) => {
                app = _app;
            });
    });

    afterEach(() => {
        return cleanUp(connectionString);
    });

    describe('/sign-in', () => {
        describe('GET /auth/sign-in', () => {
            it('expect to return 200', (done) => {
                request(app)
                    .get('/auth/sign-in')
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        return done();
                    });
            });
        });
    });

    describe('/sign-up', () => {
        describe('GET /auth/sign-up', () => {
            it('expect to return 200', (done) => {
                request(app)
                    .get('/auth/sign-up')
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        return done();
                    });
            });
        });
    });

    describe('/sign-out', () => {
        describe('GET /auth/sign-out', () => {
            it('expect to redirect to /', (done) => {
                request(app)
                    .get('/auth/sign-out')
                    .expect(302)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        return done();
                    });
            });
        });
    });
});
