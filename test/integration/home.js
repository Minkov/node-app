const request = require('supertest');

const { getApp } = require('../../app/app');

const { expect } = require('chai');

const { cleanUp } = require('../shared/db.utils');

describe('Integration /', () => {
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

    describe('GET /', () => {
        it('expect to redirect to /home', (done) => {
            request(app)
                .get('/')
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
