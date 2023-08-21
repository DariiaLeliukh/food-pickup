const db = require('../connection');

const getRestaurantByEmail = (email) => {
  return db.query('SELECT * FROM restaurants WHERE email = $1;', [email])
    .then(data => {
      return data.rows;
    });
};

const getRestaurantByID = (id) => {
  return db.query('SELECT * FROM restaurants WHERE id = $1;', [id])
    .then(data => {
      return data.rows;
    });
};

const getRestaurants = () => {
  return db.query('SELECT * FROM restaurants;')
    .then(data => {
      return data.rows;
    });
};

const getMenu = (restaurantId) => {
  return db.query(`SELECT * FROM menu_items WHERE restaurant_id = $1;`, [restaurantId])
    .then(data => {
      return data.rows;
    });
};
const getOrderStatus = (orderId) => {
  return db.query(
    `SELECT orders.id, statuses.status
    FROM orders
    JOIN statuses ON orders.status_id = statuses.id
    WHERE orders.id = $1;`, [orderId])
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
};


module.exports = { getRestaurantByEmail, getRestaurantByID, getRestaurants, getMenu, getOrderStatus };
