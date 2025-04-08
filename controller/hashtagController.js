const Post = require('../model/Post');

exports.getPostsByHashtag = async (req, res) => {
    const tag = req.params.tag;
    try {
        const hashtag = await Post.find({ tag : tag });
        if (!hashtag) {
            return res.status(404).json({
                status: "failed",
                message: "Hashtag not found"
            });
        }
        const posts = await Post.find({ tags: tag }).populate("author", "name email");
        res.status(200).json({
            status: "success",
            message: "Posts fetched successfully",
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};