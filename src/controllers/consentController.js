const ConsentForm = require('../models/consentModel');

const uploadConsentForm = async (req, res) => {
  try {
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Raw body:", req.body);
    console.log("File info:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = req.file.path;
    const fileType = req.file.mimetype.split("/")[1];

    const newConsent = new ConsentForm({
      fileUrl,
      fileType,
      uploadedBy: {
        id: req.user.id,
        name: req.user.name,
      },
    });

    await newConsent.save();

    res.status(201).json({ message: "Uploaded successfully", consent: newConsent });
  } catch (err) {
    console.error("Upload error:", err); // 👈 important
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


module.exports = { uploadConsentForm };
