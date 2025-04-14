const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes');
const path = require('path');

mongoose.connect('mongodb://venky_database:venky9985989412@ac-l5qxvfc-shard-00-00.abflfq6.mongodb.net:27017,ac-l5qxvfc-shard-00-01.abflfq6.mongodb.net:27017,ac-l5qxvfc-shard-00-02.abflfq6.mongodb.net:27017/?replicaSet=atlas-135sox-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0', 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');  // Ensure you are using EJS for views

// Add a route to serve the homepage
app.get('/', (req, res) => {
  res.render('index.ejs');  // This should point to the views/index.ejs file
});

// Include your order routes
app.use('/order', orderRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
