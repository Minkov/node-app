const { getApp } = require('./app/app');

const port = 3001;

getApp({ connectionString: 'mongodb://localhost/items' })
    .then((app) =>
        app.listen(port, () => console.log(`Magic happens at :${port}`)));
