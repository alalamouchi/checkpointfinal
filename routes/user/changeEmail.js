const User = require("../../models/User");
const nodemailer = require("nodemailer");
const { NewEmailValidation } = require("../../config/NewEmailValidation");
module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        let { oldEmail, newEmail } = req.body;
        let { error } = await NewEmailValidation({
            oldEmail,
            newEmail,
        });
        if (error) {
            return res
                .status(401)
                .json({ status: false, error: error.details[0].message });
        }
        const user = await User.findOne({ email: oldEmail });
        if (!user) {
            return res.status(401).json({
                status: false,
                error: "Wrong email, user not found.",
            });
        }
        const existedEmail = await User.findOne({ email: newEmail });

        if (existedEmail) {
            return res.status(401).json({
                status: false,
                error: "This email is already taken, please user another one.",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    email: newEmail,
                    isVerified: false,
                },
            },
            { new: true }
        );
        const output = `
            <h3>Your email was updated successfully.
            Please click on the link below to confirm your email:</h3>
            <a href="${req.protocol}://${req.get(
            "host"
        )}/confirmation/${id}">Confirm your email</a>
            `;
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: false,
          auth: {
            user: "alalamouchi122@gmail.com",
            pass: "alalamouchi122",
          },
        });
        const options = {
          from: '"GMC BLOGS Contact" <alalamouchi122@gmail.com>"',
          to: `${newEmail}`,
          subject: "Email update",
          html: output,
        };
        const { err, info } = await transporter.sendMail(options);
        if (err) {
            console.log(err);
            return res.status(400).json({ status: false, error: err });
        }
        res.status(200).json({
            status: true,
            message:
                "Your email was updated successfully, please check your email!",
            info,
            user: updatedUser,
        });
    } catch (error) {
        if (error) throw error;
        res.status(400).json({ status: false, error });
    }
};
