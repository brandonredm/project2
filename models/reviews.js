const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  album: {type: String, required: true},
  artist: {type: String, required: true},
  art: String,
  writeup: {type: String, required: true},
  score: {type: Number, required: true}
});

const Reviews = mongoose.model('reviews', reviewSchema);

module.exports = Reviews;
