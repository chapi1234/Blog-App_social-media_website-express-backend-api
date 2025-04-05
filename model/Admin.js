const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  permissions: {
    type: [String],
    enum: ["manage_users", "manage_posts", "manage_comments", "view_analytics"],
    default: ["manage_users", "manage_posts", "manage_comments"]
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  assignedCategories: [{ type: String }],
  lastLogin: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Admin", AdminSchema);
