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

const getPastOrdersForRestaurant = (restaurantId) => {
  return db.query(
    `
    SELECT orders.id AS order_id, orders.client_id, orders.order_date,
    statuses.status AS order_status,
    STRING_AGG(menu_items.name || ' (Quantity: ' || order_items.quantity || ')', ', ') AS menu_items,
    SUM(menu_items.price * order_items.quantity) AS total_cost,
    clients.phone_number, clients.email
FROM orders
JOIN statuses ON orders.status_id = statuses.id
JOIN order_items ON orders.id = order_items.order_id
JOIN menu_items ON order_items.menu_items_id = menu_items.id
JOIN clients ON orders.client_id = clients.id
WHERE orders.restaurant_id = $1
AND statuses.status = 'Completed'
GROUP BY orders.id, clients.phone_number, clients.email, statuses.status, orders.order_date
ORDER BY orders.order_date DESC;
    `,
    [restaurantId]
  );
};

const getRecentOrdersForRestaurant = (restaurantId) => {
  return db.query(
    `
    SELECT orders.id AS order_id, orders.client_id, orders.order_date,
    statuses.status AS order_status,
    STRING_AGG(menu_items.name || ' (Quantity: ' || order_items.quantity || ')', ', ') AS menu_items,
           SUM(menu_items.price * order_items.quantity) AS total_cost,
    clients.phone_number, clients.email
    FROM orders
    JOIN statuses ON orders.status_id = statuses.id
    JOIN order_items ON orders.id = order_items.order_id
    JOIN menu_items ON order_items.menu_items_id = menu_items.id
    JOIN clients ON orders.client_id = clients.id
    WHERE orders.restaurant_id = $1
    AND statuses.status IN ('Pending', 'In Progress')
    GROUP BY orders.id, clients.phone_number, clients.email, statuses.status, orders.order_date
    ORDER BY orders.order_date DESC;
    `,
    [restaurantId]
  );
};

module.exports = { getRestaurantByEmail, getRestaurantByID, getRestaurants, getMenu, getOrderStatus, getPastOrdersForRestaurant, getRecentOrdersForRestaurant };
