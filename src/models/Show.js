const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    presenter: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    airDays: {
      type: [String], // array of days (e.g. ["monday", "wednesday"])
      default: [],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    picture: {
      type: String, // Cloudinary URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Show', ShowSchema);
