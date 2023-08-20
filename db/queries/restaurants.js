const db = require('../connection');

const getUserByEmail = (email) => {
  return db.query('SELECT * FROM restaurants WHERE email = $1;', [email])
    .then(data => {
      return data.rows;
    });
};

const getUserByID = (id) => {
  return db.query('SELECT * FROM restaurants WHERE id = $1;', [id])
    .then(data => {
      return data.rows;
    });
};


module.exports = { getUserByEmail, getUserByID };
