const Comment = require("../model/Comment");


exports.getCommentById = async (req, res) => {
    const commentId = req.params.id;
    try{
        const comment = await Comment.findById(commentId).populate("author", "username profilePicture").populate("post", "title content");

        if (!comment) {
            return res.status(404).json({
                status: "failed",
                message: "Comment not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Comment retrieved successfully",
            data: comment
        });

    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        });
    }
}


exports.updateComment = async (req, res) => {
    const commentId = req.params.id;
    const userId = req.user._id; 
    const userRole = req.user.role;
    const userRoles = ["moderator", "admin", "superadmin"];

    try {
        const { content } = req.body;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                status: "failed",
                message: "Comment not found"
            });
        }

        if (comment.author.toString() !== userId.toString() && !userRoles.includes(userRole)) {
            return res.status(403).json({
                status: "failed",
                message: "You are not authorized to update this comment"
            });
        }

        comment.content = content || comment.content;
        comment.updatedAt = Date.now();
        
        await comment.save();

        res.status(200).json({
            status: "success",
            message: "Comment updated successfully",
            data: comment
        });
    } catch (error) {
        console.log("Error updating comment", error);
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};


exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    const userId = req.user._id; 
    const userRole = req.user.role;
    const userRoles = ["moderator", "admin", "superadmin"];

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                status: "failed",
                message: "Comment not found"
            });
        }

        if (comment.author.toString() !== userId.toString() && !userRoles.includes(userRole)) {
            return res.status(403).json({
                status: "failed",
                message: "You are not authorized to delete this comment"
            });
        }

        await Comment.deleteOne({ _id: commentId });

        res.status(200).json({
            status: "success",
            message: "Comment deleted successfully"
        });
    } catch (error) {
        console.log("Error deleting comment", error);
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}



exports.likeComment = async (req, res) => {
    const commentId = req.params.id;
    const userId = req.user._id;

    try{
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                status: "failed",
                message: "Comment not found"
            });
        }

        if (comment.likes.includes(userId)) {
            return res.status(400).json({
                status: "failed",
                message: "You have already liked this comment"
            });
        }

        comment.likes.push(userId);
        await comment.save();

        res.status(200).json({
            status: "success",
            message: "Comment liked successfully",
            data: comment
        });
    } catch (err) {
        console.log("Error liking comment", err);
        res.status(500).json({
            status: "failed",
            message: err.message
        });
    }
}

exports.unlikeComment = async (req, res) => {
    const commentId = req.params.id;
    const userId = req.user._id; 

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                status: "failed",
                message: "Comment not found"
            });
        }

        if (!comment.likes.includes(userId)) {
            return res.status(400).json({
                status: "failed",
                message: "You have not liked this comment yet"
            });
        }

        comment.likes.pull(userId);
        await comment.save();

        res.status(200).json({
            status: "success",
            message: "Comment unliked successfully",
            data: comment
        });
    } catch (error) {
        console.log("Error unliking comment", error);
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}
