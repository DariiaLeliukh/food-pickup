const express = require('express');
const router = express.Router();
const restaurantQueries = require('../db/queries/restaurants');

router.get('/:id', (req, res) => {
  const restaurantId = req.params.id;
  Promise.all([
    restaurantQueries.getMenu(restaurantId),
    restaurantQueries.getRestaurants()
  ])
    .then(results => {
      console.log(restaurantId);
      const menuItems = results[0];
      const restaurants = results[1];
      const rId = restaurantId - 1;
      res.render('restaurantMenu', { menuItems, restaurants, rId });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;