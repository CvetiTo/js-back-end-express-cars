const express = require('express');
const hbs = require('express-handlebars');

const initDb = require('./models/index.js');

const carsService = require('./services/cars.js');
const accessoryService = require('./services/accessory.js');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about.js');
const create = require('./controllers/create.js');
const { details } = require('./controllers/details.js');
const edit = require('./controllers/edit.js');
const deleteCar = require('./controllers/delete.js');
const accessory = require('./controllers/accessory.js');

const { notFound } = require('./controllers/notFound.js');
const attach = require('./controllers/attach.js');

start();

async function start() {
    await initDb();

    const app = express();

    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));

    app.use(carsService());
    app.use(accessoryService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.route('/create').get(create.get).post(create.post);
    app.route('/delete/:id').get(deleteCar.get).post(deleteCar.post);
    app.route('/edit/:id').get(edit.get).post(edit.post);

    app.route('/accessory').get(accessory.get).post(accessory.post);
    app.route('/attach/:id').get(attach.get).post(attach.post);

    app.all('*', notFound);

    app.listen(3000, () => console.log('Server started on port 3000'));
 
}
