const RadioStream = require("../models/RadioStream");

// GET /api/radio
const getRadioStream = async (req, res) => {
  try {
    const stream = await RadioStream.findOne();
    if (!stream) {
      return res.status(404).json({ message: "Radio stream not found" });
    }
    res.json(stream);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/radio
const updateRadioStream = async (req, res) => {
  try {
    const { title, description, streamUrl } = req.body;

    const updated = await RadioStream.findOneAndUpdate(
      {},
      { title, description, streamUrl, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/radio/seed
const seedRadioStream = async (req, res) => {
  try {
    const exists = await RadioStream.findOne();
    if (exists) return res.json({ message: "Already exists", stream: exists });

    const stream = await RadioStream.create({
      title: "Caali FM Live Radio",
      description: "Live Gospel Music 24/7",
    streamUrl: "http://localhost:8000/live"

    });

    res.status(201).json(stream);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getRadioStream,
  updateRadioStream,
  seedRadioStream
};
