const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../model/User");
const Token = require("../model/Token");
const SuperAdmin = require("../model/SuperAdmin");
const Admin = require("../model/Admin");
const Moderator = require("../model/Moderator");
const { registerValidation, loginValidation } = require("../validation/validation");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
  }
});

const generateAccessToken = (user) => {
  return jwt.sign({ _id: user._id,  role: user.role  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5d",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

exports.register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    return res.status(400).send(errorDetails);
  }

  const { name, email, password, role, gender, phone } = req.body;

  try {
    let user = null;
    if (role === "user") {
      user = await User.findOne({ email });
    }
    if (role === "superadmin") {
      user = await SuperAdmin.findOne({ email });
    }

    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if (role === "user") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        gender,
        phone,
      });
    }
    if (role === "superadmin") {
      user = new SuperAdmin({
        name,
        email,
        password: hashedPassword,
        role,
        gender,
        phone,
      });
    }
    await user.save();
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    console.log("Error during registration", err);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

// Login User
exports.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    return res.status(400).send(errorDetails);
  }
  const { email, password } = req.body;
  try {
    let user = null;
    const member = await User.findOne({ email });
    const moderator = await Moderator.findOne({ email });
    const admin = await Admin.findOne({ email });
    const superadmin = await SuperAdmin.findOne({ email });

    if (member) {
      user = member;
    }
    if (moderator) {
      user = moderator;
    }
    if (admin) {
      user = admin;
    }
    if (superadmin) {
      user = superadmin;
    }
    if (!user) return res.status(400).json({ message: "User not found !!!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // save or update the refresh token in the database
    await Token.findOneAndUpdate(
      { userId: user._id },
      { refreshToken },
      { upsert: true }
    );

    // set the refresh token in the cookie as an http-only
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      data: user,
    });
  } catch (err) {
    console.log("Error during login", err);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(403).json({ message: "No refresh token provided" });

    const storedToken = await Token.findOne({ refreshToken });
    if (!storedToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        storedToken.refreshToken = newRefreshToken;
        await storedToken.save();

        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
        });
        res.json({ accessToken: newAccessToken });
      }
    );
  } catch (err) {
    console.log("Error during refreshing the refresh token", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout User
exports.logout = async (req, res) => {
  try {
    await Token.findOneAndDelete({ refreshToken: req.cookies.refreshToken });
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
