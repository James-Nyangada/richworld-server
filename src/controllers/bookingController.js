const Booking = require("../models/Booking")

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body)
    await booking.save()
    res.status(201).json(booking)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!booking) return res.status(404).json({ error: "Booking not found" })
    res.json(booking)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
