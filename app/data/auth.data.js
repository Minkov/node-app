const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('users');
    return {
        findBy(props) {
            return collection.findOne(props);
        },
        getById(id) {
            return collection.findOne({ _id: new ObjectID(id) })
                .then((todo) => {
                    if (!todo) {
                        return null;
                    }

                    todo.id = todo._id;
                    return todo;
                });
        },
        create(username, password) {
            const user = {
                username,
                password,
            };

            return collection.insert(user)
                .then((result) => {
                    return user;
                });
        },
    };
};

module.exports = { getData };
