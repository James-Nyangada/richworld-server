const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    category: { type: String, trim: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    featuredImage: { type: String },
    secondaryImage: { type: String },
    slug: { type: String, unique: true, index: true }, // 👈 slug field
  },
  { timestamps: true }
);


// ✅ Generate slug from title before saving
BlogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Blog", BlogSchema);
