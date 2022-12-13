const User = require("../../models/User");
const nodemailer = require("nodemailer");
module.exports = async (req, res) => {
    try {
        let { email } = req.body;
        if (!email) {
            return res.status(401).json({
                status: false,
                message: "Empty field : cannot send empty email field.",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "User not found, please verify your e-mail",
            });
        }
        const output = `
            <h3>Welcome to GMC BLOGS,you asked to reset your password.
            Please click on the link below to reset your password:</h3>
            <a href="https://${req.get(
            "host"
        )}/reset-password/${user.id}">Reset Password</a>
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
          to: `${email}`,
          subject: "Confirm your email",
          html: output,
        };
        const { error, info } = await transporter.sendMail(options);
        if (error) {
            return res.status(400).json({ status: false, error });
        }
        console.log(info);
        return res.status(200).json({
            status: true,
            message:
                "A request to reset your password has been sen. Please check your email. ",
        });
    } catch (error) {
        res.status(400).json({ status: false, error });
    }
};
