const express = require('express');
const router = express.Router();
const { createShow, getShows, getShowById, updateShow, deleteShow } = require('../controllers/showController');
const upload = require('../middleware/upload'); // same middleware you used for presenter images

// Create a show (with picture upload)
router.post('/', upload.single('picture'), createShow);

// Get all shows
router.get('/', getShows);

// Get a single show
router.get('/:id', getShowById);

// Update a show
router.put('/:id', upload.single('picture'), updateShow);

// Delete a show
router.delete('/:id', deleteShow);

module.exports = router;
