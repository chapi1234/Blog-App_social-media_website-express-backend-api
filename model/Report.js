const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    reason: { type: String, required: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("Report", ReportSchema);
  