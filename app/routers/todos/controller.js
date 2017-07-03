const isValid = (item) => {
    return typeof item !== 'undefined' &&
        typeof item.text === 'string' &&
        item.text.length > 3;
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
            return data.getById(req.params.id)
                .then((todo) => {
                    if (!todo) {
                        return res.redirect('/todos/all');
                    }

                    return res.render('todos/details', {
                        context: todo,
                    });
                });
        },
        create(req, res) {
            const todo = req.body;

            if (!isValid(todo)) {
                return Promise.resolve()
                    .then(() => res.redirect(400, '/todos/form'));
            }

            return data.create(todo.text)
                .then((result) => {
                    res.redirect('/todos/' + result.id);
                });
        },
    };
};


module.exports = { getController };
