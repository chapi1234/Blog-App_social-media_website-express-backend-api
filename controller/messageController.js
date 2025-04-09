const Message = require('../model/Message');
const Notification = require('../model/Notification');

exports.sendMessage = async (req, res) => {
    const { receiver, content } = req.body;
    const sender = req.user._id;

    try {
        const message = new Message({ sender, receiver, content });
        await message.save();

        const notification = new Notification({
            recipient: receiver,
            sender: sender,
            type: 'message'
        });
        await notification.save();

        req.io.emit('receiveNotification', {
            recipient: receiver,
            sender: sender,
            type: 'message',
            createdAt: notification.createdAt
        });
        
        res.status(201).json({
            status: "success",
            message: "Message sent successfully",
            data: message
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};

exports.getAllMessages = async (req, res) => {
    const userId = req.user._id;
    try {
        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }]
        }).sort({ createdAt: -1 });
        res.status(200).json({
            status: "success",
            message: "Messages fetched successfully",
            data: messages
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};

exports.getMessageById = async (req, res) => {
    const messageId = req.params.id;
    try {
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({
                status: "failed",
                message: "Message not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Message fetched successfully",
            data: message
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};


exports.updateMessage = async (req, res) => {
    const messageId = req.params.id;
    const { content } = req.body;
    const userId = req.user._id;
    try {
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({
                status: "failed",
                message: "Message not found"
            });
        }
        if (message.sender.toString() !== userId.toString()) {
            return res.status(403).json({
                status: "failed",
                message: "You are not authorized to update this message"
            });
        }
        const updatedmessage = await Message.findByIdAndUpdate(
            messageId,
            { $set : content},
            { new : true }
        )

        if (!updatedmessage) {
            return res.status(404).json({
                status: "failed",
                message: "Message not found"
            })
        }
    } catch(error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}


exports.deleteMessage = async (req, res) => {
    const messageId = req.params.id;
    try {
        const message = await Message.findByIdAndDelete(messageId);
        if (!message) {
            return res.status(404).json({
                status: "failed",
                message: "Message not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Message deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
};