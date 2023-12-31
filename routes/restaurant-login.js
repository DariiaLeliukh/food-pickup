const express = require('express');
const router = express.Router();
const restaurantsQueries = require('../db/queries/restaurants');
const bcrypt = require("bcryptjs");

router.get('/', (req, res) => {
  if (req.session.user_id) {
    res.redirect("/restaurant-recent-orders");
  } else {
    const templateVars = {
      user: null,
      error: false
    };
    res.render("restaurantLogin", templateVars);
  }
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  restaurantsQueries.getRestaurantByEmail(email)
    .then(data => {
      if (data.length === 0 || !bcrypt.compareSync(password, data[0].password)) {
        const templateVars = {
          user: null,
          error: true
        };
        res.render("restaurantLogin", templateVars);
        return;
      } else {
        req.session.user_id = data[0].id;
        res.redirect("/restaurant-recent-orders");
      }

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
