const Show = require('../models/Show');

// Create a new show
exports.createShow = async (req, res) => {
  try {
    const { title, presenter, genre, duration, description, airDays, status } = req.body;

    let picture = null;
    if (req.file) {
      picture = req.file.path; // multer + cloudinary will provide this
    }

    const newShow = new Show({
      title,
      presenter,
      genre,
      duration,
      description,
      airDays,
      status,
      picture,
    });

    await newShow.save();
    res.status(201).json(newShow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all shows
exports.getShows = async (req, res) => {
  try {
    const shows = await Show.find().sort({ createdAt: -1 });
    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single show
exports.getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (!show) return res.status(404).json({ message: 'Show not found' });
    res.json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a show
exports.updateShow = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates.picture = req.file.path;
    }

    const updatedShow = await Show.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedShow) return res.status(404).json({ message: 'Show not found' });

    res.json(updatedShow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a show
exports.deleteShow = async (req, res) => {
  try {
    const deletedShow = await Show.findByIdAndDelete(req.params.id);
    if (!deletedShow) return res.status(404).json({ message: 'Show not found' });
    res.json({ message: 'Show deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
