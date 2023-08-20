const express = require('express');
const router = express.Router();
const restaurantsQueries = require('../db/queries/restaurants');

router.get('/', (req, res) => {

  if (!req.session.user_id) {
    res.redirect("/restaurant-login");
  } else {
    restaurantsQueries.getRestaurantByID(req.session.user_id)
      .then(data => {
        if (data.length === 0) {
          res.redirect("/restaurant-login");
          return;
        } else {
          const templateVars = {
            user: data[0] || null,
          };
          res.render("pastOrders", templateVars);
        }

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  }
});

module.exports = router;
