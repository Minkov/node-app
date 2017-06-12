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
            let todo = req.body;
            console.log('-'.repeat(50));
            console.log(todo);

            if (!isValid(todo)) {
                return res.redirect(400, '/form');
            }

            data.create(todo.text)
                .then((result) => {
                    res.redirect('/todos/' + result.id);
                });
        },
    };
};


module.exports = { getController };
