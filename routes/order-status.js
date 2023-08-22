const express = require('express');
const router = express.Router();
const restaurantsQueries = require('../db/queries/restaurants');

// GET see status for order
router.get('/order/:id', (req, res) => {
  const orderId = req.params.id;

  restaurantsQueries.getOrderStatus(orderId)

    .then((status) => {
      res.render('orderStatus', { status });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
