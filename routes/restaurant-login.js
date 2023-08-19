const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

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
  

  // const foundUser = getUserByEmail(email, users);

  // if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
  //   res.status(403).send("Invalid creadentials");
  // } else {
  //   req.session.user_id = foundUser.id;
  //   res.redirect(`/urls`);
  // }
});

module.exports = router;