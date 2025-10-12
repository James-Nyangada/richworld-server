const { Schema, model } = require("mongoose");

const tripBookingSchema = new Schema({
    customerId: {
        type: Schema.ObjectId,
        required: true,
        ref: "User"
    },
    tripDetails: {
        destination: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        packageType: { type: String, required: true }, // e.g., "Safari", "Beach", etc.
    },
    price: {
        type: Number,
        required: true,
    },
    payment_status: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid",
    },
    booking_status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
    },
    mpesaReceiptNumber: { type: String, default: null },
    mpesaCheckoutRequestId: { type: String, default: null },
    lastPaymentCheck: { type: Date, default: null },
}, { timestamps: true });

module.exports = model("TripBooking", tripBookingSchema);
