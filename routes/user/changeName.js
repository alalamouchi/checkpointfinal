const User = require("../../models/User");
module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(
            id ,
            { $set: { ...req.body } },
            { new: true }
        );
        res.status(200).json({
            status: true,
            message: "Your Name  was updated successfully.",
        });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ status: false, error });
    }
};
