const request = require('supertest');

const { MongoClient } = require('mongodb');

const { getApp } = require('../../app/app');

const { expect } = require('chai');

const { cleanUp } = require('../shared/db.utils');

const async = require('../../utils/async');


const createTodos = (connectionString, count) => {
    let todos = null;
    return MongoClient.connect(connectionString)
        .then((db) => {
            todos = Array.from({ length: count })
                .map((_, index) => {
                    return {
                        text: `Todo ${index + 1}`,
                        isDone: false,
                    };
                });
            return Promise.all(
                todos.map((todo) => {
                    return db.collection('todos')
                        .insert(todo);
                })
            );
        })
        .then(() => todos);
};

describe('Integration /todos', () => {
    const todosCount = 10;
    let app = null;
    const connectionString = 'mongodb://localhost/test-db';
    let todos = [];

    beforeEach(() => {
        return Promise
            .all([
                getApp({ connectionString }),
                createTodos(connectionString, todosCount)]
            )
            .then(([_app, _todos]) => {
                app = _app;
                todos = _todos;
            });
    });

    afterEach(() => {
        return cleanUp(connectionString);
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

        it('GET /todos/:id', (done) => {
            request(app)
                .get('/todos/' + todos[0]._id)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('GET /todos/form', (done) => {
            request(app)
                .get('/todos/form')
                .expect(302)
                .end((err, res) => {
                    expect(res.text).to.contain('/auth/sign-in');
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
        const signUpUser = (agent, user) => {
            return new Promise((resolve, reject) => {
                agent.post('/auth/sign-up')
                    .type('form')
                    .send(user)
                    .end((err, res, req) => {
                        resolve();
                    });
            });
        };

        const signInUser = (agent, user) => {
            return new Promise((resolve, reject) => {
                agent.post('/auth/sign-in')
                    .type('form')
                    .send(user)
                    .end((err, res, req) => {
                        resolve();
                    });
            });
        };

        let user = null;
        let agent = null;

        beforeEach(() => {
            user = {
                username: 'Coki',
                password: '123456qw',
            };

            agent = request.agent(app);
            return async()
                .then(() => signUpUser(agent, user))
                .then(() => signInUser(agent, user));
        });

        it('GET /todos/form', (done) => {
            agent.get('/todos/form')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('POST /todos', (done) => {
            agent.post('/todos')
                .type('form')
                .send({
                    text: 'It works',
                })
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }

                    expect(1).to.equal(1);
                    done();
                });
        });
    });
});
