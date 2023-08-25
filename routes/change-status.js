const express = require('express');
const router = express.Router();
const orderQueries = require('../db/queries/orders');

router.post("/", (req, res) => {
  console.log(req.body);

  const { status, orderId } = req.body;
  // let
  orderQueries.updateOrder(status, orderId)
    .then((data) => {
      if (data[0].status_id === 3) { // 3 is for completed status
        res.redirect(`/restaurant-past-orders`);
      } else {
        res.redirect(`/restaurant-recent-orders`);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
