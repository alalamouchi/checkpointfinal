const express = require("express");
const router = express.Router();
const verify = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/uploads");

// /api/user/register : REGISTER
router.post("/register", require("./register"));

// /api/user/login : LOGIN
router.post("/login", require("./login"));

// /api/user/blog/create/:id: CREATE BLOG
router.post(
    "/blog/create/:id",
    verify,
    upload.array("photos", 20),
    require("./createBlog")
);

// /api/user/blog/update : UPDATE BLOG
router.put("/blog/update", verify, require("./updateBlog"));

// /api/user/blog/delete: DELETE BLOG
router.delete("/blog/delete", verify, require("./deleteBlog"));

// /api/user/blogs : GET BLOGS
router.get("/blogs", require("./getBlogs"));

// /api/user/myBlogs:id : GET BLOG
router.get("/myBlogs/:id", verify, require("./getUserBlogs"));

// /api/user/resetpasswordmail : SEND RESET PASSWORD EMAIL
router.post("/resetpasswordmail", require("./resetPasswordMail"));

// /api/user/verifyEmail/:id : VERIFY EMAIL
router.put("/verifyEmail/:id", require("./verifyEmail"));

// /api/user/resertPassword/:id: RESET PASSWORD
router.put("/resetpassword/:id", require("./resetPassword"));

// /api/user/changeEmail/:id: CHANGE EMAILL
router.put("/changeEmail/:id", require("./changeEmail"));

// /api/user/changeName/:id: CHANGE NAME
router.put("/changeName/:id", require("./changeName"));
module.exports = router;
