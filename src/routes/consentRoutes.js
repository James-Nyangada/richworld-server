const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerMiddleware'); // from earlier step
const auth = require('../middleware/authMiddleware')
const { uploadConsentForm } = require('../controllers/consentController');

// POST /api/consents/upload
router.post('/upload',auth, upload.single('file'), uploadConsentForm);

module.exports = router;
