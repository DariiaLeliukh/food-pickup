const db = require('../connection');

const addOrder = (restaurant_id, client_id, total) => {
  return db.query("INSERT INTO orders (restaurant_id, client_id, status_id, total) VALUES ($1, $2, 1, $3) RETURNING *;", [restaurant_id, client_id, total])
    .then(data => {
      return data.rows;
    });
};

const addOrderItems = (order, orderId) => {
  const queryParams = [];
  let counter = 1;
  let rows = 0;
  const length = Object.keys(order).length;

  let queryString = ` INSERT INTO order_items (order_id, menu_items_id, quantity) VALUES `;

  for (const element in order) {
    queryString += `($${counter++}, `;
    queryParams.push(orderId);

    queryString += `$${counter++}, `;
    queryParams.push(element);

    queryString += `$${counter++} )`;
    queryParams.push(order[element]);

    if (rows !== length - 1) {
      queryString += ', ';
    }
    rows++;
  }

  queryString += ' RETURNING *;'

  return db.query(queryString, queryParams)
    .then(data => {
      return data.rows;
    });
};

const updateOrder = (status, orderId) => {
  return db.query("UPDATE orders SET status_id = $1 WHERE id = $2 RETURNING *;", [status, orderId])
    .then(data => {
      return data.rows;
    });
}


module.exports = { addOrder, addOrderItems, updateOrder };
