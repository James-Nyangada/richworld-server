const Presenter = require("../models/Presenter");

// Create Presenter
const createPresenter = async (req, res) => {
  try {
    const { fullName, email, status } = req.body;

    // Cloudinary file upload
    let pictureUrl = "";
    if (req.file && req.file.path) {
      pictureUrl = req.file.path; // multer-storage-cloudinary already gives cloudinary URL
    }

    const presenter = await Presenter.create({
      fullName,
      email,
      picture: pictureUrl,
      status: status || "inactive",
    });

    res.status(201).json({
      success: true,
      data: presenter,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Presenters
const getPresenters = async (req, res) => {
  try {
    const presenters = await Presenter.find();
    res.status(200).json({ success: true, data: presenters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Presenter
const getPresenterById = async (req, res) => {
  try {
    const presenter = await Presenter.findById(req.params.id);
    if (!presenter) {
      return res.status(404).json({ success: false, message: "Presenter not found" });
    }
    res.status(200).json({ success: true, data: presenter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Presenter
const updatePresenter = async (req, res) => {
  try {
    const { fullName, email, status } = req.body;

    let updatedData = { fullName, email, status };
    if (req.file && req.file.path) {
      updatedData.picture = req.file.path;
    }

    const presenter = await Presenter.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!presenter) {
      return res.status(404).json({ success: false, message: "Presenter not found" });
    }

    res.status(200).json({ success: true, data: presenter });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Presenter
const deletePresenter = async (req, res) => {
  try {
    const presenter = await Presenter.findByIdAndDelete(req.params.id);

    if (!presenter) {
      return res.status(404).json({ success: false, message: "Presenter not found" });
    }

    res.status(200).json({ success: true, message: "Presenter deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPresenter,
  getPresenters,
  getPresenterById,
  updatePresenter,
  deletePresenter,
};
