const express = require('express');
const router  = express.Router();
const restaurantsQueries = require('../db/queries/restaurants');
const bcrypt = require("bcryptjs");


// const owner = 'Ralph';
// const password = 'password';

router.get('/', (req, res) => {
  console.log(req.session);

  if (req.session.user_id) {
    res.redirect("/urls");
  } else {
    res.render("restaurantLogin");
  }
});

router.post("/", (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);


  //const foundUser = getUserByEmail(email);

  restaurantsQueries.getUserByEmail(email)
    .then(data => {
      console.log(data);

      if (data.length === 0) {
        console.log("Invalid creadentials");
      }

      console.log(typeof(data));
      console.log(data.password);

      if (!bcrypt.compareSync(password, data.password)) {
        console.log("Invalid password")
      }

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  // if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
  //   res.status(403).send("Invalid creadentials");
  // } else {
  //   req.session.user_id = foundUser.id;
  //   res.redirect(`/urls`);
  // }
});

module.exports = router;
