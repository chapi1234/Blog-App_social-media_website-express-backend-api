const User = require("../model/User");

exports.followUser = async (req, res) => {
  const userIdToFollow = req.params.id;
  const userId = req.user._id;

  try {
    if (userId === userIdToFollow) {
      return res.status(400).json({
        status: false,
        message: "You cannot follow yourself",
      });
    }

    const userToFollow = await User.findById(userIdToFollow);
    const currentUser = await User.findById(userId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (userToFollow.followers.includes(userId)) {
      return res.status(400).json({
        status: false,
        message: "You are already following this user",
      });
    }

    userToFollow.followers.push(userId);
    currentUser.following.push(userIdToFollow);

    await userToFollow.save();
    await currentUser.save();

    res.status(200).json({
      status: true,
      message: "User followed successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.unfollowUser = async (req, res) => {
  const userIdToUnfollow = req.params.id;
  const userId = req.user._id;
  try {
    const userToUnfollow = await User.findById(userIdToUnfollow);
    const currentUser = await User.findById(userId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (!userToUnfollow.followers.includes(userId)) {
      return res.status(400).json({
        status: false,
        message: "You are not following this user",
      });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (followerId) => followerId.toString() !== userId.toString()
    );
    currentUser.following = currentUser.following.filter(
      (followingId) => followingId.toString() !== userIdToUnfollow.toString()
    );

    await userToUnfollow.save();
    await currentUser.save();

    res.status(200).json({
      status: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getFollowers = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate(
      "followers",
      "name email profilePicture"
    );

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Fetched followers successfully",
      data: user.followers,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getFollowing = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate("following", "name email profilePicture");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Fetched following successfully",
      data: user.following,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: message.error,
    });
  }
};
