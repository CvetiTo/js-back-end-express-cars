const express = require('express');
const hbs = require('express-handlebars');

const carsService = require('./services/cars.js');

const { about } = require('./controllers/about.js');
const { create } = require('./controllers/create.js');
const { details } = require('./controllers/details.js');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound.js');

const app = express();

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(carsService());

app.get('/', home);
app.get('/about', about);
app.get('/create', create);
app.get('/details/:id', details);

app.all('*', notFound);

app.listen(3000, () => console.log('Server started on port 3000'));
