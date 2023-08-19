const express = require('express');
const router = express.Router();
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
      console.log('data');
      console.log(data[0]);
      console.log("type of " + typeof (data));

      console.log('data.password');
      console.log(data[0].password);

      if (data.length === 0) {
        res.status(403).json({ error: 'Invalid Credentials' });
        return;
      } else if (!bcrypt.compareSync(password, data[0].password)) {
        // TODO: combine this else if with previous if and make it look nice (return to form with error Invalid Credentials)
        res.status(403).json({ error: 'Invalid password' });
      } else {
        res.redirect("/");
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
