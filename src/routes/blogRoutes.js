const express = require("express")
const router = express.Router()
const {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController")

const upload = require("../middleware/upload") // your multer config

// Upload expects two different fields
router.post(
  "/",
  upload.fields([
    { name: "blogImage", maxCount: 1 },
    { name: "secondaryImage", maxCount: 1 },
  ]),
  createBlog
);

router.get("/", getBlogs)
router.get("/:slug", getBlogBySlug); // 👈 fetch blog by slug
router.put(
  "/:id",
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "secondaryImage", maxCount: 1 },
  ]),
  updateBlog
)
router.delete("/:id", deleteBlog)

module.exports = router
