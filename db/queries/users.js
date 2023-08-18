const db = require('../connection');

//this will not work for now, users DB is not created in migrations
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
