const mongoose = require('mongoose');

const ModeratorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["moderator"], required: true, default: "moderator" },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  permissions: [{ type: String, enum: ["manage_posts", "manage_comments"] }],
  assignedCategories: [{ type: String }], 
  profilePicture: { type: String, default: "" },
  lastLogin: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Moderator", ModeratorSchema);
