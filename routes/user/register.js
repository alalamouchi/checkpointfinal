const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { RegisterValidation } = require("../../config/RegisterValidation");
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  try {
    let { firstName, lastName, phoneNumber, email, password, repeat_password } =
      req.body;
    //CHECK THE EMAIL
    let checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(401).json({
        status: false,
        error: "This email is already exists, please enter another one",
      });
    }
    //REGISTER VALIDATION
    let { error } = await RegisterValidation({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      repeat_password,
    });
    if (error) {
      return res
        .status(401)
        .json({ status: false, error: error.details[0].message });
    }
    //CRYPT THE PASSWORD
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    // CREATE NEW USER
    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
    });
    const newUser = await user.save();

    //Send confirmation email
    // const output = `
    //     <h3>Welcome to GMC BLOGS, your account was created successfully.
    //     Please click on the link below to confirm your account:</h3>
    //     <a href="https://${req.get("host")}/confirmation/${
    //     user.id
    // }">Confirm your account</a>
    //     `;
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: false,
    //   auth: {
    //     user: "alalamouchi122@gmail.com",
    //     pass: "alalamouchi122",
    //   },
    // });
    // const options = {
    //   from: '"GMC BLOGS Contact" <alalamouchi122@gmail.com>"',
    //   to: `${email}`,
    //   subject: "Confirm your email",
    //   html: output,
    // };
    // const { err, info } = await transporter.sendMail(options);
    // if (err) {
    //     return res.status(400).json({ status: false, error: err });
    // }

    //SEND FINAL RESPONSE
    res.status(200).json({
      status: true,
      message:
        "Your account was created successfully, please check your email and verify it",
      user: newUser,
    });
  } catch (error) {
    if (error) throw error;
    res.send(400).json({ status: false, error });
  }
};
