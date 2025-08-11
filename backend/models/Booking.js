const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  quantity: Number,
  totalPrice: Number,
  status: { type: String, default: 'confirmed' } // mock
}, { timestamps: true });
module.exports = mongoose.model('Booking', bookingSchema);