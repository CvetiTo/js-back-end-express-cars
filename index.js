const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');

const initDb = require('./models/index.js');

const carsService = require('./services/cars.js');
const accessoryService = require('./services/accessory.js');
const authService = require('./services/auth.js');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about.js');
const create = require('./controllers/create.js');
const { details } = require('./controllers/details.js');
const edit = require('./controllers/edit.js');
const deleteCar = require('./controllers/delete.js');
const accessory = require('./controllers/accessory.js');

const { notFound } = require('./controllers/notFound.js');
const attach = require('./controllers/attach.js');
const authController = require('./controllers/auth.js');
const { isLoggedIn } = require('./services/util.js');

start();

async function start() {
    await initDb();

    const app = express();

    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);
    app.set('view engine', 'hbs');

    app.use(session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));

    app.use(carsService());
    app.use(accessoryService());
    app.use(authService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.route('/create').get(isLoggedIn(), create.get).post(isLoggedIn(),create.post);
    app.route('/delete/:id').get(isLoggedIn(),deleteCar.get).post(isLoggedIn(),deleteCar.post);
    app.route('/edit/:id').get(isLoggedIn(),edit.get).post(isLoggedIn(),edit.post);

    app.route('/accessory').get(isLoggedIn(),accessory.get).post(isLoggedIn(),accessory.post);
    app.route('/attach/:id').get(isLoggedIn(),attach.get).post(isLoggedIn(),attach.post);
    app.use(authController); 

    app.all('*', notFound);

    app.listen(3000, () => console.log('Server started on port 3000'));
 
}
