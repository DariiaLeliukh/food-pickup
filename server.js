// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const cookieSession = require('cookie-session');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
  name: 'session',
  keys: ["somethingshouldbehere"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const restaurantLogin = require('./routes/restaurant-login');
const restaurantLogout = require('./routes/restaurant-logout');
const pastOrders = require('./routes/restaurant-past-orders');
const recentOrders = require('./routes/restaurant-recent-orders');
const restaurantApiRoutes = require('./routes/all-restaurants');
const restaurantMenu = require('./routes/menu');
const orderStatus = require('./routes/order-status');
const cartCheckout = require('./routes/cart-checkout');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/restaurant-login', restaurantLogin);
app.use('/restaurant-logout', restaurantLogout);
app.use('/restaurant-past-orders', pastOrders);
app.use('/restaurant-recent-orders', recentOrders);
app.use('/api/all-restaurants', restaurantApiRoutes);
app.use('/menu', restaurantMenu);
app.use('/order-status', orderStatus);
app.use('/checkout', cartCheckout);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const templateVars = {
    user: null,
  };
  res.render('index', templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
