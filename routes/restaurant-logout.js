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
    };
    res.render("restaurantLogin", templateVars);
  }
});

router.post("/", (req, res) => {
    // clear cookie
    req.session = null;
    // redirect back to restaurant-login page
    res.redirect("/restaurant-login");
  });


module.exports = router;
