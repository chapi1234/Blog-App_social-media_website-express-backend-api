const { json } = require('express');
const User = require('../model/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users || users.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'No Users Found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Fetched All the Users',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message });
    };
};


exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User Not Found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Fetched User Successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message });
    };
};


exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    try{
        const user = await User.findByIdAndUpdate(
            userId,
            { $set : req.body}, 
            { new: true });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User Not Found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'User Updated Successfully',
            data: user
        })
    }
    catch (error) {
        console.log("Error in updating user: ", error);
        return res.status(500).json({
            status: false,
            message: error.message });
    }
}


exports.deleteUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User Not Found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'User Deleted Successfully',
            data: user
        });
    } catch (err) {
        console.log("Error in deleting user: ", err);
        return res.status(500).json({
            status: false,
            message: err.message });
    };
};