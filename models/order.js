const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  age: Number,
  foodItems: [String]
});

module.exports = mongoose.model('Order', orderSchema);
