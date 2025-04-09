const Notification = require('../model/Notification');

exports.createNotification = async (req, res) => {
    const { recipient, sender, type, postId } = req.body;

    try {
        const notification = new Notification({
            recipient,
            sender,
            type,
            postId
        });

        await notification.save();

        // Emit the notification in real-time
        req.io.emit('receiveNotification', {
            recipient,
            sender,
            type,
            postId,
            createdAt: notification.createdAt
        });

        res.status(201).json({
            status: "success",
            message: "Notification created successfully",
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};

exports.getAllNotifications = async (req, res) => {
    const userId = req.user._id;
    try {
        const notifications = await Notification.find({ recipient: userId })
            .populate('sender', 'username profilePicture')
            .sort({ createdAt: -1 });

        if (!notifications) {
            return res.status(404).json({
                status: "failed",
                message: "No notifications found"
            });
        }

        res.status(200).json({
            status: "success",
            data: notifications
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            error: error.message
        });
    };
};


exports.markNotificationAsRead = async (req, res) => {
    const notificationId = req.params.id;
    try {
        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { isRead: true },
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({
                status: "failed",
                message: "Notification not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Notification marked as read",
            data: notification
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};


exports.deleteNotification = async (req, res) => {
    const notificationId = req.params.id;
    try {
        const notification = await Notification.findByIdAndDelete(notificationId);
        if (!notification) {
            return res.status(404).json({
                status: "failed",
                message: "Notification not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Notification deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};