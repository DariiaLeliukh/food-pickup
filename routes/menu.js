const express = require('express');
const router = express.Router();
const restaurantQueries = require('../db/queries/restaurants');

router.get('/:id', (req, res) => {
  const restaurantId = req.params.id;
  let restaurantInfo = {};
  let menuItems = {};
  restaurantQueries.getRestaurantByID(restaurantId)
    .then(results => {
      restaurantInfo = results[0];
    })
    .then(() => {
      return restaurantQueries.getMenu(restaurantId);
    })
    .then((results) => {
      menuItems = results;
      res.render('restaurantMenu', { menuItems, restaurantInfo });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;
