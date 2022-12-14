const User = require("../../models/User");
const { NewPasswordValidation } = require("../../config/NewPassordValidation");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
    try {
        let { newPassword, confirmNewPassword } = req.body;
        let { id } = req.params;
        let { error } = await NewPasswordValidation({
            newPassword,
            confirmNewPassword,
        });
        if (error) {
            return res
                .status(401)
                .json({ status: false, error: error.details[0].message });
        }
        let salt = await bcrypt.genSalt(10);
        let hashedNewPassword = await bcrypt.hash(newPassword, salt);
        await User.findByIdAndUpdate(
            id,
            {
                $set: { password: hashedNewPassword },
            },
            { new: true }
        );
        res.status(200).json({
            status: true,
            message: "Password was updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, error });
    }
};
