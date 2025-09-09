const mongoose = require('mongoose');

const PresenterSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String, // URL from Cloudinary
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
}, { timestamps: true });

module.exports = mongoose.model('Presenter', PresenterSchema);
