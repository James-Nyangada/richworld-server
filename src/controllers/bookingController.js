const Booking = require("../models/Booking")
const { sendBookingConfirmation, sendBookingNotification } = require("../utilities/emailService")

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
    await sendBookingConfirmation(booking.email, booking)
    await sendBookingNotification(process.env.COMPANY_EMAIL, booking)

    res.status(201).json({ message: "Booking created and emails sent" })
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
  