const SavedPost = require("../model/SavedPost");

exports.getSavedPosts = async (req, res) => {
  const userId = req.user._id;

  try {
    const savedPosts = await SavedPost.find({ userId })
      .populate("userId", "name email")
      .populate("postId", "title content");

    if (!savedPosts || savedPosts.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No saved posts found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Fetched saved posts successfully",
      data: savedPosts,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.createSavedPost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id; 

  try {
    const existingSavedPost = await SavedPost.findOne({ userId, postId });

    if (existingSavedPost) {
      return res.status(400).json({
        status: "failed",
        message: "Post already saved",
      });
    }

    const savedPost = new SavedPost({ userId, postId });
    await savedPost.save();

    res.status(200).json({
      status: "success",
      message: "Post saved successfully",
      data: savedPost,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.deleteSavedPost = async (req, res) => {
  const savedPostId = req.params.id;
  const userId = req.user._id;

  try {

    const savedpost = await SavedPost.findById(savedPostId);
    if (!savedpost) {
      return res.status(404).json({
        status: "failed",
        message: "Saved post not found",
      });
    }

    if (userId !== savedpost.userId.toString()) {
        return res.status(403).json({
          status: false,
          message: "You are not authorized to delete this savedpost",
        });
    };

    const deletedSavedPost = await SavedPost.findByIdAndDelete(savedPostId);
    
    res.status(200).json({
      status: "success",
      message: "Saved post deleted successfully",
      data: deletedSavedPost,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
