const Schedule = require('../models/Schedule');

// Create schedule
exports.createSchedule = async (req, res) => {
  try {
    const { day, show, presenter, time } = req.body;

    const newSchedule = new Schedule({ day, show, presenter, time });
    await newSchedule.save();

    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all schedules
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('show', 'title genre')
      .populate('presenter', 'fullName bio')
      .sort({ day: 1, time: 1 });

    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single schedule
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate('show', 'title genre')
      .populate('presenter', 'fullName bio');

    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update schedule
exports.updateSchedule = async (req, res) => {
  try {
    const updates = req.body;
    const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, updates, { new: true })
      .populate('show', 'title genre')
      .populate('presenter', 'fullName bio');

    if (!updatedSchedule) return res.status(404).json({ message: 'Schedule not found' });

    res.json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!deletedSchedule) return res.status(404).json({ message: 'Schedule not found' });

    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
