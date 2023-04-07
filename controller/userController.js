const { db } = require("../model/User");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const salt = 11;
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    // Check if user is already signed up?
    const userExisting = await User.findOne({ email: req.body.email });
    if (userExisting) {
      return res
        .status(400)
        .json({ message: "User Already exists, try Sign in" });
    }

    // Encrypt user password before saving
    const encPassword = bcrypt.hashSync(req.body.password, salt);

    // Create a new user and store in DB
    const user = await User.create({ ...req.body, password: encPassword });

    return res.status(200).json({ message: "User signed up successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.signin = async (req, res) => {
  try {
    //Check if user is signed Up?
    const userExisting = await User.findOne({ email: req.body.email });
    if (!userExisting) {
      return res
        .status(400)
        .json({ message: "User doesnot exists, Sign Up first" });
    }

    // Check if user password matches with db password
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      userExisting.password
    );

    // If password does not match, return Invalid password
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const { _id, firstname, email } = userExisting;

    const token = jwt.sign({ _id, firstname, email }, "secret", {
      expiresIn: "2h"
    });

    return res.status(200).json({ token , message: "Signin Succesfull" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
