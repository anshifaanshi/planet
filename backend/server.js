const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const eventRoutes = require('./routes/events'); // import routes from separate file
const productRoutes = require('./routes/products');
const cartRoutes=require('./routes/cart')
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', eventRoutes); 
app.use('/api', productRoutes);
app.use('/api',cartRoutes)// mount routes under /api

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log('Server running on', PORT)))
  .catch(err => console.error(err));
