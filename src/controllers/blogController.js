const Blog = require("../models/Blog")

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);

    const { title, subtitle, category, content, date } = req.body;

    // ✅ Cloudinary URLs are available at `file.path`
    const featuredImage = req.files?.blogImage
      ? req.files.blogImage[0].path
      : null;
    const secondaryImage = req.files?.secondaryImage
      ? req.files.secondaryImage[0].path
      : null;

    if (!featuredImage) {
      return res
        .status(400)
        .json({ message: "Featured image is required." });
    }

    const blog = new Blog({
      title,
      subtitle,
      category,
      content,
      date,
      featuredImage,   // ✅ Cloudinary URL
      secondaryImage,  // ✅ Cloudinary URL
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Blog creation failed:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.json(blogs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get a single blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const updates = req.body

    if (req.files) {
      if (req.files.featuredImage && req.files.featuredImage[0]) {
        updates.featuredImage = req.files.featuredImage[0].path
      }
      if (req.files.secondaryImage && req.files.secondaryImage[0]) {
        updates.secondaryImage = req.files.secondaryImage[0].path
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true })
    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" })

    res.json(updatedBlog)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
    if (!deletedBlog) return res.status(404).json({ message: "Blog not found" })
    res.json({ message: "Blog deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
