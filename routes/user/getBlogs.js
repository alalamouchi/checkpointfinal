const Blog = require("../../models/Blog");

module.exports = async (req, res) => {
    try {
        let blogs = await Blog.find();
        res.status(200).json({ status: true, data: blogs });
    } catch (error) {
        if (error) throw error;
        res.status(401).json({ status: false, error: "bad" });
    }
};
