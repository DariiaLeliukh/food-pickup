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

          const restaurantId = data[0].id;
          restaurantsQueries.getPastOrdersForRestaurant(restaurantId)
            .then(pastOrders => {
              for (let element of pastOrders.rows) {
                element.menu_items = "{" + element.menu_items + "}";
                element.menu_items = JSON.parse(element.menu_items);
                element.total_cost = (element.total_cost / 100).toFixed(2);
              }
              const templateVars = {
                user: data[0] || null,
                pastOrders: pastOrders.rows,
              };
              res.render("pastOrders", templateVars);
            })
            .catch(err => {
              res.status(500).json({ error: err.message });
            });
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
