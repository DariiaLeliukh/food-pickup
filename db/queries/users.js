const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const addUser = (userName, userPhoneNumber, userEmail) => {
  return db.query("INSERT INTO clients (name, email, phone_number) VALUES ($1, $2, $3) RETURNING *;", [userName, userEmail, userPhoneNumber])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers, addUser };
