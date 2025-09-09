const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");
const multer = require("multer");

// Use memory storage so files don’t go to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post(
  "/",
  upload.array("images"), // "images" must match frontend FormData key
  packageController.createPackage
);

router.get("/", packageController.getPackages);
router.get("/:id", packageController.getPackageById);
router.put("/:id", packageController.updatePackage);
router.delete("/:id", packageController.deletePackage);

module.exports = router;
