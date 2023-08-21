const express = require('express');
const router = express.Router();
const restaurantQueries = require('../db/queries/restaurants');

router.get('/:id/menu', (req, res) => {
  const restaurant_id = req.params.id;
  console.log('hooola');
  restaurantQueries.getMenu(restaurant_id)
    .then(menu_items => {
      res.send(menu_items);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;