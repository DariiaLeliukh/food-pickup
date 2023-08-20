const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
  // clear cookie
  req.session = null;
  // redirect back to restaurant-login page
  res.redirect("/restaurant-login");
});


module.exports = router;
