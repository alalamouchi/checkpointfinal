const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
module.exports = async (req, res) => {
  try {
    let { email, password } = req.body;
    let checkUser = await User.findOne({ email });
    // CHECK THE VALIDITY OF THE EMAIL
    if (!checkUser) {
      return res.status(401).json({
        status: false,
        message: "Wrong e-mail or password, please try again",
      });
    }
    //CHECK THE PASSWORD
    let match = await bcrypt.compare(password, checkUser.password);
    if (!match) {
      return res.status(401).json({
        status: false,
        message: "Wrong e-mail or password, please try again",
      });
    }

    //CREATE TOKEN
    let token = await jwt.sign(
      {
        id: checkUser._id,
        password: checkUser.password,
        email: checkUser.email,
        isUser: checkUser.isUser,
        isAdmin: checkUser.isAdmin,
      },
      SECRET_KEY,
      { expiresIn: "10h" }
    );

    res.status(200).json({
      status: true,
      message: "WELCOME BACK",
      token,
      isUser: checkUser.isUser,
      isAdmin: checkUser.isAdmin,
      id: checkUser._id,
    });
  } catch (error) {
    if (error) throw error;
    res.send(400).json({ status: false, error });
  }
};
