const express = require('express');
const router = express.Router();
const orderQueries = require('../db/queries/orders');

router.post("/", (req, res) => {
  console.log(req.body);

  const { status } = req.body;
  // let 
});

module.exports = router;
