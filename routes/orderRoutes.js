const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/order', async (req, res) => {
  try {
    const { name, age, foodItems } = req.body;
    const order = new Order({ name, age, foodItems });

    await order.save();
    res.send('Order placed successfully!');
  } catch (err) {
    res.status(500).send('Error placing order');
  }
});

module.exports = router;
