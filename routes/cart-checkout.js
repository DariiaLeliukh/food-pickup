const express = require('express');
const router = express.Router();
const orderQueries = require('../db/queries/orders');
const userQueries = require('../db/queries/users');

//TODO for each query check if data exists at all

router.post("/", (req, res) => {
  console.log(req.body);

  const { clientName, clientPhoneNumber, clientEmail, clientOrderItems, clientTotal, restaurantId } = req.body;
  let userID;
  let orderId;

  userQueries.addUser(clientName, clientPhoneNumber, clientEmail)
    .then(data => {
      userID = data[0].id;
    })
    .then(() => {
      return orderQueries.addOrder(restaurantId, userID, clientTotal);
    })
    .then((data) => {
      const order = JSON.parse(clientOrderItems); //{menu_item:quantity}
      orderId = data[0].id;
      return orderQueries.addOrderItems(order, orderId);
    })
    .then((data) => {
      res.redirect(`/order-status/order/${orderId}/`);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

module.exports = router;
