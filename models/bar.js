const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
  name: String,
  location: String,
  latitude: Number,
  longitude: Number,
  images: [
    {
      url: String,
      filename: String
    }
  ],
  rating: Number,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Bar', barSchema);