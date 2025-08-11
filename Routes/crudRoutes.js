const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/ChangePwd");
const { DeleteBlog } = require("../Controllers/crudController");
const {PostBlog , CheckBlogs , UpdateBlog , DeleteBlog} = requrie("../Controllers/crudController")


router.post("/post-blog" , authMiddleware  , PostBlog)
router.get("/get-blog" , authMiddleware ,CheckBlogs)
router.put("/update-blog/:id" , authMiddleware , UpdateBlog )
router.delete("/delete-blog/:id" , authMiddleware , DeleteBlog)





module.exports = router ;