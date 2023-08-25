const express = require('express');
const router = express.Router();
const orderQueries = require('../db/queries/orders');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const client = require('twilio')(accountSid, authToken);

router.post("/", (req, res) => {

  const { status, orderId } = req.body;
  let newOrderStatus;
  orderQueries.updateOrder(status, orderId)
    .then((data) => {
      newOrderStatus = data[0].status_id;
    })
    .then(() => {
      return orderQueries.getUserbyOrderId(orderId);
    })
    .then((result) => {
      const user = result;
      let message = '';
      if (newOrderStatus === 3) { // 3 is for completed status
        message = `Your order #${orderId} is ready for pickup`;
      } else if (newOrderStatus === 2) {
        message = `Your order #${orderId} is in progress`;
      } else {
        message = `Your order #${orderId} is pending`;
      }
      return client.messages
        .create({
          body: message,
          from: twilioPhone,
          to: user.phone_number
        });
    })
    .then(() => {
      if (newOrderStatus === 3) { // 3 is for completed status
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
