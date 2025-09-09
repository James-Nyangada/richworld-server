const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      required: true,
    },
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Show',
      required: true,
    },
    presenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Presenter',
      required: true,
    },
    time: {
      type: String, // e.g. "18:00" or "6:00 PM"
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Schedule', ScheduleSchema);
