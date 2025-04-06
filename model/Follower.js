const mongoose = require("mongoose");

const FollowerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    follower: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    createdAt: { type: Date, default: Date.now }
  });
  
module.exports = mongoose.model("Follower", FollowerSchema);
  