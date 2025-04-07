const Report = require("../model/Report");
const User = require("../model/User");
const Post = require("../model/Post");
const Comment = require("../model/Comment");

exports.createReport = async (req, res) => {
  const { type, targetId, reason } = req.body;
  const reportedBy = req.user._id;

  try {
    let target;

    if (type === "user") {
      target = await User.findById(targetId);
      if (!target) {
        return res.status(404).json({
          status: "failed",
          message: "User not found",
        });
      }
    } else if (type === "post") {
      target = await Post.findById(targetId);
      if (!target) {
        return res.status(404).json({
          status: "failed",
          message: "Post not found",
        });
      }
    } else if (type === "comment") {
      target = await Comment.findById(targetId);
      if (!target) {
        return res.status(404).json({
          status: "failed",
          message: "Comment not found",
        });
      }
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Invalid report type",
      });
    }

    const report = new Report({
      reportedBy,
      userId: type === "user" ? targetId : undefined,
      postId: type === "post" ? targetId : undefined,
      commentId: type === "comment" ? targetId : undefined,
      reason,
    });

    await report.save();

    res.status(201).json({
      status: "success",
      message: "Report created successfully",
      data: report,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reportedBy", "name email")
      .populate("postId", "title")
      .populate("userId", "name email")
      .populate("commentId", "content");

    res.status(200).json({
      status: "success",
      message: "Reports fetched successfully",
      data: reports,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};


exports.getReportById = async (req, res) => {
  const reportId  = req.params.id;

  try {
    const report = await Report.findById(reportId)
      .populate("reportedBy", "name email")
      .populate("postId", "title")
      .populate("userId", "name email")
      .populate("commentId", "content");

    if (!report) {
      return res.status(404).json({
        status: "failed",
        message: "Report not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Report fetched successfully",
      data: report,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
}


exports.updateReportStatus = async (req, res) => {
  const reportId = req.params.id;

  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({
        status: "failed",
        message: "Report not found",
      });
    }

    report.status = 'resolved';
    await report.save();

    res.status(200).json({
      status: "success",
      message: "Report status updated successfully",
      data: report,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};


exports.deleteReport = async (req, res) => {
  const reportId = req.params.id;
  try {
    const report = await Report.findByIdAndDelete(reportId);

    if(!report) {
      return res.status(400).json({
        status : "error",
        message: "the report is unavailable"
      });
    };

    res.status(200).json({
      status: "success",
      message: "Successfully deleted the report",
      data: report
    })
  } catch (err) {
    res.status(500).json ({
      status: "failed",
      message: message.error
    })
  }
}