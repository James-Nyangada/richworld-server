const Package = require("../models/Package");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// @desc Create a new package
exports.createPackage = async (req, res) => {
  try {
    const {
      name,
      location,
      duration,
      price,
      inclusions,
      exclusions,
      hotels,
      itinerary,
      specialNotes,
    } = req.body;

    let uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const streamUpload = () =>
          new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              { folder: "travel-packages" },
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
          });

        const result = await streamUpload();
        uploadedImages.push(result.secure_url);
      }
    }

    const newPackage = await Package.create({
      name,
      location,
      duration,
      price,
      inclusions: inclusions ? JSON.parse(inclusions) : [],
      exclusions: exclusions ? JSON.parse(exclusions) : [],
      hotels: hotels ? JSON.parse(hotels) : [],
      itinerary,
      specialNotes,
      images: uploadedImages,
    });

    res.status(201).json(newPackage);
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get all packages
exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages" });
  }
};

// @desc Get single package
exports.getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: "Error fetching package" });
  }
};

// @desc Update a package
exports.updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPackage)
      return res.status(404).json({ message: "Package not found" });

    res.json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: "Error updating package" });
  }
};

// @desc Delete a package
exports.deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting package" });
  }
};
