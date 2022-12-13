const Blog = require("../../models/Blog");
const User = require("../../models/User");
const sizeOf = require("image-size");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");
module.exports = async (req, res) => {
    try {
        let { title, text } = req.body;
        let { id } = req.params;
        let user = await User.findById(id);
        const uploader = async (path) =>
            await cloudinary.uploads(path, "uploads");

        if (req.files.length !== 0) {
            const urls = [];
            const files = req.files;
            for (const file of files) {
                const { path } = file;
                const newPath = await uploader(path);
                urls.push({
                    url: newPath.url,
                    width: sizeOf(file.path).width,
                    heigth: sizeOf(file.path).height,
                });
                fs.unlinkSync(path);
            }
            const blog = await new Blog({
                title,
                text,
                photos: urls,
                owner: `${user.firstName} ${user.lastName}`,
                userId: user._id,
            });
            const newBlog = await blog.save();
            return res.status(200).json({
                status: true,
                message: "Your blog was created succesfully",
                data: newBlog,
            });
         
        } else {
            res.status(405).json({
                status: false,
                message: "error",
                
            });
        }
    
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ status: false, error });
    }
};
