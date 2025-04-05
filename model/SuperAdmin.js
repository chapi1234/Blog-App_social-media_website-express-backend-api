const mongoose = require('mongoose');

const SuperAdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin"], required: true, default: "superadmin" },
  permissions: {
    type: [String],
    enum: ["manage_admins", "manage_users", "manage_posts", "manage_comments", "manage_settings", "view_analytics"],
    default: ["manage_admins", "manage_users", "manage_posts", "manage_comments", "manage_settings", "view_analytics"]
  },
  lastLogin: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SuperAdmin", SuperAdminSchema);
