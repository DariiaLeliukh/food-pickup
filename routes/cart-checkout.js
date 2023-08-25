const express = require('express');
const router = express.Router();
const orderQueries = require('../db/queries/orders');
const userQueries = require('../db/queries/users');
const restaurantQueries = require('../db/queries/restaurants');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const client = require('twilio')(accountSid, authToken);

//TODO for each query check if data exists at all

router.post("/", (req, res) => {

  const { clientName, clientPhoneNumber, clientEmail, clientOrderItems, clientTotal, restaurantId } = req.body;
  let user;
  let orderId;

  userQueries.addUser(clientName, clientPhoneNumber, clientEmail)
    .then(data => {
      user = data[0];
    })
    .then(() => {
      return orderQueries.addOrder(restaurantId, user.id, clientTotal);
    })
    .then((data) => {
      const order = JSON.parse(clientOrderItems); //{menu_item:quantity}
      orderId = data[0].id;
      return orderQueries.addOrderItems(order, orderId);
    })
    .then(() => {
      return client.messages
        .create({
          body: 'Your order has been placed',
          from: twilioPhone,
          to: user.phone_number
        });
    })
    .then(() => {
      return restaurantQueries.getRestaurantByID(restaurantId);
    })
    .then((restaurant) => {
      const restaurantPhoneNumber = restaurant[0].phone_number;
      return client.messages
        .create({
          body: `You have a new order #${orderId}`,
          from: twilioPhone,
          to: restaurantPhoneNumber
        });
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
