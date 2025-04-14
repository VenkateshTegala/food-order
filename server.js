const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
//const Order = require('./models/Order');

dotenv.config();

mongoose.connect('mongodb+srv://varunbotcha:ZhWVDkbx7jYVPqPf@cluster0.cq5n7w3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'css')));


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index'); 
});


app.post('/order', async (req, res) => {
  console.log('Received order:', req.body);
  try {
    let { name, age, foodItems } = req.body;
    if (typeof foodItems === 'string') {
      foodItems = foodItems.split(',').map(item => item.trim());
    }
    const order = new Order({ name, age, foodItems });
    await order.save();
    res.send('Order placed successfully!');
  } catch (err) {
    console.error('Order saving error:', err);
    res.status(500).send('Error placing order');
  }
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});