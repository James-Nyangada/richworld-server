const mongoose = require('mongoose');

const consentFormSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['pdf', 'jpg', 'png'], required: true },
  uploadedBy: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ConsentForm', consentFormSchema);
