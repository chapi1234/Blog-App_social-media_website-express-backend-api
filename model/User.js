const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  coverPhoto: { type: String, default: "" },
  bio: { type: String, default: "" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  role: { type: String, enum: ["user","moderator", "admin", "superadmin"], default: "user", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);