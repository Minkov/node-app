const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('todos');
    return {
        getAll() {
            return collection.find({})
                .toArray()
                .then((todos) => {
                    return todos.map((todo) => {
                        todo.id = todo._id;
                        return todo;
                    });
                });
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
        create(text) {
            const todo = {
                text,
                isDone: false,
            };

            return collection.insert(todo)
                .then((result) => {
                    todo.id = todo._id;
                    return todo;
                });
        },
    };
};

module.exports = { getData };
