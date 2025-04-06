const Post = require('../model/Post'); 
const Notification = require('../model/Notification');
const Comment = require('../model/Comment');
const User = require('../model/User');
const { postValidation } = require('../validation/validation');

exports.createPost = async (req, res) => {
    console.log("req.user: ", req.user);
    const { title, content, tags } = req.body;
    const author = req.user._id; 
    try { 
        const { error } = postValidation(req.body);
        if (error) {
            return res.status(400).json({
                status: "failed",
                message: error.details[0].message
            });
        }

        const normalizedTags = tags.map(tag => tag.toLowerCase());
        const tag = [...new Set(normalizedTags)];

        const image = req.file ? req.file.path : null;

        const post = new Post({
            author,
            title,
            content,
            tags: tag || [],
            image
        });

        await post.save();

        res.status(201).json({
            status: "success",
            message: "Post created successfully",
            data: post
        });
    } catch (error) {
        console.log("Error creating create post", error);
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};


exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({ status: "published" }).populate("author", "name email").sort({ createdAt: -1 });

        if (!posts || posts.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "No posts found"
            });
        };

        res.status(200).json({
            status: "success",
            message: "All posts fetched successfully",
            data: posts
        });
    } catch (error) {
        console.log("Error fetching all posts", error);
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};

exports.getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId).populate("author", "name email");

        if (!post) {
            return res.status(404).json({
                status: "failed",
                message: "Post not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Post fetched successfully",
            data: post
        });
    } catch (error) {
        console.log("Error fetching post by ID", error);
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    };
};


exports.getUserPosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const posts = await Post.find({ author: userId }).populate("author", "name email").sort({ createdAt: -1 });

        if (!posts || posts.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "No posts found for this user"
            });
        }

        res.status(200).json({
            status: "success",
            message: "User posts fetched successfully",
            data: posts
        });
    } catch (error) {
        console.log("Error fetching user posts", error);
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    };
};



exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, content, tags, media, visibility } = req.body;
    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                status: "failed",
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user.userId) {
            return res.status(403).json({
                status: "failed",
                message: "You are not authorized to update this post"
            });
        }

        const normalizedTags = tags.map(tag => tag.toLowerCase());
        const tag = [...new Set(normalizedTags)];

        post.title = title || post.title;
        post.content = content || post.content;
        post.tags = tag || post.tags;
        post.media = media || post.media;
        post.visibility = visibility || post.visibility;
        post.updatedAt = Date.now();
        if (req.file) {
            post.image = req.file.path;
        }

        await post.save();

        res.status(200).json({
            status: "success",
            message: "Post updated successfully",
            data: post
        });
    } catch (error) {
        console.log("Error updating post", error);
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};


exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
            
            if (!post) {
                return res.status(404).json({
                    status: "failed",
                    message: "Post not found"
                });
            }
    
            console.log("Post Author:", post.author.toString()); // Debugging post.author
            console.log("Request User ID:", req.user._id);

            if (post.author.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    status: "failed",
                    message: "You are not authorized to delete this post"
                });
            }
    
            await Post.deleteOne({ _id: postId });
    
            res.status(200).json({
                status: "success",
                message: "Post deleted successfully"
            });

    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        });
    }
}

exports.likePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id; 

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                status: "failed",
                message: "Post not found"
            });
        }

        if (post.likes.includes(userId)) {
            return res.status(400).json({
                status: "failed",
                message: "You have already liked this post"
            });
        }

        post.likes.push(userId);
        await post.save();

        res.status(200).json({
            status: "success",
            message: "Post liked successfully",
            data: post
        });
    } catch (error) {
        console.log("Error liking post", error);
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    };
};


exports.unLikepost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id; 

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                status: "failed",
                message: "Post not found"
            });
        }

        if (!post.likes.includes(userId)) {
            return res.status(400).json({
                status: "failed",
                message: "You have not liked this post yet"
            });
        }

        post.unlikes.pull(userId);
        await post.save();

        res.status(200).json({
            status: "success",
            message: "Post unliked successfully",
            data: post
        });
    } catch (error) {
        console.log("Error unliking post", error);
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}

// you have to reexamine this code controller funnction
exports.sharePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: "failed",
        message: "Post not found",
      });
    }

    if (post.shares.includes(userId)) {
      return res.status(400).json({
        status: "failed",
        message: "You have already shared this post",
      });
    }

    post.shares.push(userId);
    await post.save();

    const user = await User.findById(userId).populate("followers", "_id name email");

    if (!user || !user.followers || user.followers.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "Post shared successfully, but no followers to notify",
        data: post,
      });
    }


    const notifications = user.followers.map((follower) => ({
      recipient: follower._id, 
      sender: userId, 
      type: "share", 
      postId: post._id, 
    }));

    await Notification.insertMany(notifications);

    res.status(200).json({
      status: "success",
      message: "Post shared successfully with your followers",
      data: post,
    });
  } catch (error) {
    console.log("Error sharing post", error);
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};


exports.commentPost = async (req, res) => {
}