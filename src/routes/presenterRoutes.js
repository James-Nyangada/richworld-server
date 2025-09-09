const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // multer-cloudinary setup
const {
  createPresenter,
  getPresenters,
  getPresenterById,
  updatePresenter,
  deletePresenter,
} = require("../controllers/presenterController");

router.post("/", upload.single("picture"), createPresenter);
router.get("/", getPresenters);
router.get("/:id", getPresenterById);
router.put("/:id", upload.single("picture"), updatePresenter);
router.delete("/:id", deletePresenter);

module.exports = router;
