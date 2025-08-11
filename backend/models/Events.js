const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  venue: String,
  price: Number,
  ticketsAvailable: Number
}, { timestamps: true });
module.exports = mongoose.model('Event', eventSchema);