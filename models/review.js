const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Review', reviewSchema);