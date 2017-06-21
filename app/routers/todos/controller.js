const isValid = (item) => {
    return typeof item !== 'undefined' &&
        typeof item.text === 'string';
};

const getController = (data) => {
    return {
        getAll(req, res) {
            return data.getAll()
                .then((todos) => {
                    return res.render('todos/all', {
                        context: todos,
                    });
                });
        },
        getDetails(req, res) {
            data.getById(req.params.id)
                .then((todo) => {
                    return res.render('todos/details', {
                        context: todo,
                    });
                });
        },
        create(req, res) {
            const todo = req.body;

            if (!isValid(todo)) {
                return res.redirect(400, '/form');
            }

            return data.create(todo.text)
                .then((result) => {
                    res.redirect('/todos/' + result.id);
                });
        },
    };
};


module.exports = { getController };
