const Admin = require("../model/Admin");
const Moderator = require("../model/Moderator");
const SuperAdmin = require("../model/SuperAdmin");
const bcrypt = require('bcryptjs')
const { registerValidation } = require("../validation/validation");

exports.CreateAdmin = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        const errorDetails = error.details.map((detail) => detail.message);
        return res.status(400).send(errorDetails);
    }

    const { name, email, password, role, gender, phone } = req.body;

    try{
        const user = await Admin.findOne({ email });
        if (user) {
            return res.status(400).json({
                status: "failed",
                message: "Admin already exists ",
            });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        if (role == 'admin'){
            newadmin = new Admin({
                name,
                email,
                password: hashedPassword,
                role,
                gender,
                phone
            })
        };
    
        await newadmin.save();
    
        res.status(201).json({
            status: "success",
            message: "Admin created successfully",
            data: newadmin
        });
    } catch (err) {
        console.log("Failed to create Admin", err);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            error: err.message
        });
    }
   
}


exports.CreateModerator = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        const errorDetails = error.details.map((detail) => detail.message);
        return res.status(400).send(errorDetails);
    }

    const { name, email, password, role, gender, phone } = req.body;

    try{
        const user = await Moderator.findOne({ email });
        if (user) {
            return res.status(400).json({
                status: "failed",
                message: "Moderator already exists ",
            });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        if (role == 'moderator'){
            newmoderator = new Moderator({
                name,
                email,
                password: hashedPassword,
                role,
                gender,
                phone
            })
        };
    
        await newmoderator.save();
    
        res.status(201).json({
            status: "success",
            message: "Moderator created successfully",
            data: newadminormoderator
        });
    } catch (err) {
        console.log("Failed to create Moderator", err);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            error: err.message
        });
    }
   
}

exports.DeactivateAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({
                status: "failed",
                message: "Admin not found",
            });
        }

        admin.status = "inactive";
        await admin.save();

        res.status(200).json({
            status: "success",
            message: "Admin inactivated successfully",
            data: admin,
        });
    } catch (err) {
        console.log("Failed to inactivate Admin", err);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            error: err.message,
        });
    }
}

exports.DeactivateModerator = async (req, res) => {
    const { id } = req.params;

    try {
        const moderator = await Moderator.findById(id);
        if (!moderator) {
            return res.status(404).json({
                status: "failed",
                message: "Moderator not found",
            });
        }

        moderator.status = "inactive";
        await moderator.save();

        res.status(200).json({
            status: "success",
            message: "Moderator inactivated successfully",
            data: moderator,
        });
    } catch (err) {
        console.log("Failed to inactivate Moderator", err);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            error: err.message,
        });
    }
}
exports.ActivateAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({
                status: "failed",
                message: "Admin not found",
            });
        }

        admin.status = "active";
        await admin.save();

        res.status(200).json({
            status: "success",
            message: "Admin activated successfully",
            data: admin,
        });
    } catch (err) {
        console.log("Failed to activate Admin", err);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            error: err.message,
        });
    }
}

exports.ActivateModerator = async (req, res) => {
    const { id } = req.params;

    try {
        const moderator = await Moderator.findById(id);
        if (!moderator) {
            return res.status(404).json({
                status: "failed",
                message: "Moderator not found",
            });
        }

        moderator.status = "active";
        await moderator.save();

        res.status(200).json({
            status: "success",
            message: "Moderator activated successfully",
            data: moderator,
        });
    } catch (err) {
        console.log("Failed to activate Moderator", err);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            error: err.message,
        });
    }
}

