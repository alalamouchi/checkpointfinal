const Blog = require("../../models/Blog");
module.exports = async (req, res) => {
    try {
        let { id } = req.query;
        let blog = await Blog.findByIdAndUpdate(
            id,
            {
                $set: { ...req.body },
            },
            { new: true }
        );
        res.status(200).json({
            status: true,
            message: "Blog updated successfully",
            data: blog,
        });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ status: false, error });
    }
};
