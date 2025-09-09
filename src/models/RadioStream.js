// models/RadioStream.js
const mongoose = require('mongoose');

const RadioStreamSchema = new mongoose.Schema({
  title: String,
  description: String,
  streamUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

module.exports = mongoose.model('RadioStream', RadioStreamSchema);
