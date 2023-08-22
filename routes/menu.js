const express = require('express');
const router = express.Router();
const restaurantQueries = require('../db/queries/restaurants');

router.get('/:id', (req, res) => {
  const restaurantId = req.params.id;
  restaurantQueries.getMenu(restaurantId)
    .then(menuItems => {
      res.render('restaurantMenu', { menuItems });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;