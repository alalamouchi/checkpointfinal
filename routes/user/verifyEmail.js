const User = require("../../models/User");
module.exports = async (req, res) => {
    try {
        let { id } = req.params;
        await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    isVerified: true,
                },
            },
            { new: true }
        );
        res.status(200).json({
            status: true,
            message: "Your email is verified!",
        });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ status: false, error });
    }
};
