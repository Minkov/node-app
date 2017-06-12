const { Router } = require('express');

const isValid = (item) => {
    return typeof item !== 'undefined' &&
        typeof item.text === 'string';
};

module.exports = {
    initRouter(data) {
        const router = new Router();

        router
            .get('/', (req, res) => {
                return data.getAll()
                    .then((todos) => {
                        return res.render('todos/all', {
                            context: todos,
                        });
                    });
            })
            .get('/form', (req, res) => {
                return res.render('todos/form');
            })
            .get('/:id', (req, res) => {
                data.getById(req.params.id)
                    .then((todo) => {
                        return res.render('todos/details', {
                            context: todo,
                        });
                    });
            })
            .post('/', (req, res) => {
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
            });
        return router;
    },
};
