const Blog = require("../../models/Blog");
module.exports = async (req, res) => {
    try {
        let { _id } = req.query;
        await Blog.findByIdAndDelete(_id);
        res.status(200).json({
            status: true,
            message: "Blog was deleted successfully",
        });
    } catch (error) {
        if (error) throw error;
        res.status(401).json({ status: false, error });
    }
};
