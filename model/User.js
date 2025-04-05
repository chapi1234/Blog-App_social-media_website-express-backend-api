const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user","moderator", "admin", "superadmin"], default: "user", required: true },
  profilePicture: { type: String, default: "" },
  coverPhoto: { type: String, default: "" },
  bio: { type: String, default: "" },
  gender: { type: String, enum: ["male", "female"], default: "male" },
  phone: { type: Number, default: null },
  dateOfBirth: { type: Date, default: null },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "SavedPost" }],
  otp: { type: String },
  otpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);