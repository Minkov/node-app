const { Router } = require('express');

const { ObjectID } = require('mongodb');

const isValid = (item) => {
    return typeof item !== 'undefined' &&
        typeof item.text === 'string';
};

module.exports = {
    initRouter(db) {
        const router = new Router();

        router
            .get('/', (req, res) => {
                db.collection('items')
                    .find({})
                    .toArray()
                    .then((items) => {
                        items = items.map((item) => {
                            item.id = item._id;
                            return item;
                        });
                        return res.render('all', {
                            context: items,
                        });
                    });
            })
            .get('/form', (req, res) => {
                return res.render('form');
            })
            .get('/:id', (req, res) => {
                db.collection('items')
                    .findOne({ _id: new ObjectID(req.params.id) })
                    .then((item) => {
                        return res.render('details', {
                            context: item,
                        });
                    });
            })
            .post('/', (req, res) => {
                let item = req.body;
                console.log(item);
                if (!isValid(item)) {
                    return res.redirect(400, '/form');
                }

                db.collection('items')
                    .insert(item)
                    .then((result) => {
                        res.redirect(201, '/' + item._id);
                    });
            });
        return router;
    },
};
