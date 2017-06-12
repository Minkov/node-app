const { getApp } = require('./app/app');

const port = 3001;

getApp({ connectionString: 'mongodb://localhost/items' })
    .then((app) =>
        app.listen(port, () => 
            // eslint-disable-next-line no-console
            console.log(`Magic happens at :${port}`))); 
