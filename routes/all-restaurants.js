const express = require('express');
const router = express.Router();
const restaurantQueries = require('../db/queries/restaurants');

router.get('/', (req, res) => {
  restaurantQueries.getRestaurants()
    .then(restaurants => {
      res.send(restaurants);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
