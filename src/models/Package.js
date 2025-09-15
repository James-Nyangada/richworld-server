const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String, // e.g., "3-days", "custom"
      default: "custom",
    },
    category: {
      type: String, // e.g., "adventure", "relaxation"
      default: "safari",
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String, // Cloudinary URLs
      },
    ],
    inclusions: {
      type: [String],
      default: [],
    },
    exclusions: {
      type: [String],
      default: [],
    },
    hotels: [
      {
        name: { type: String },
        price: { type: Number },
      },
    ],
    itinerary: [
      {
        day: { type: String },
        plan: { type: String },
      },
    ],
    specialNotes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "published", "active", "inactive"],
      default: "published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", PackageSchema);
