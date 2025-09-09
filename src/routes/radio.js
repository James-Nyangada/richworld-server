const express = require("express");
const router = express.Router();
const {
  getRadioStream,
  updateRadioStream,
  seedRadioStream
} = require("../controllers/radioController");

router.get("/get-radio", getRadioStream);
router.put("/update-radio", updateRadioStream);
router.post("/seed", seedRadioStream);

module.exports = router;
