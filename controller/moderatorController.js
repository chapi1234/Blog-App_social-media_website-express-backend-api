const Moderator = require('../model/Moderator');

exports.getAllModerators = async (req, res) => {
    try {
        const moderators = await Moderator.find({});
        if (!moderators || moderators.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'No Moderators Found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Fetched All the Moderators',
            data: moderators
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message });
    };
}


exports.getAllActiveModerators = async (req, res) => {
    try {
        const moderators = await Moderator.find({ status: active });
        if (!moderators || moderators.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'No Active Moderators Found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Fetched All Active Moderators',
            data: moderators
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message });
    };
}

exports.getAllInactiveModerators = async (req, res) => {
    try {
        const moderators = await Moderator.find({ status: inactive });
        if (!moderators || moderators.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'No Active Moderators Found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Fetched All Active Moderators',
            data: moderators
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message });
    };
}


exports.getModeratorById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Moderator.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'Moderator Not Found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Fetched Moderator Successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message });
    };
};


exports.updateModerator = async (req, res) => {
    const userId = req.params.id;
    const requestingUser = req.user;

    const allowedRoles = ['moderator', 'admin', 'superadmin'];
    if (!allowedRoles.includes(requestingUser.role)) {
        return res.status(403).json({
            status: false,
            message: 'Access Denied: You do not have permission to update moderator information.'
        });
    }

    try {
        const user = await Moderator.findByIdAndUpdate(
            userId,
            { $set: req.body },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'Moderator Not Found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Moderator Updated Successfully',
            data: user
        });
    } catch (error) {
        console.error('Error updating moderator:', error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        });
    }
};



exports.deleteModerator = async (req, res)=> {
    const userId = req.params.id;

    try {
        const deletedUser = await Moderator.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                status: false,
                message: 'Moderator Not Found'
            });
        };
        
        res.status(200).json({
            status: true,
            message: 'Moderator Deleted Successfully',
            data: deletedUser
        });
    } catch (error) {
        console.log('Error to delete moderator:', error);
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};