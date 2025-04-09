const Admin = require("../model/Admin");

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    if (!admins || admins.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No Admins Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Fetched All the Admins",
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllInactiveAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({ status: "inactive" });
    if (!admins || admins.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No Inactive Admins Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Fetched All the Inactive Admins",
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getAllActiveAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({ status: "active" });
    if (!admins || admins.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No Active Admins Found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Fetched All Active Admins",
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getAdminById = async (req, res) => {
    try{
        const adminId = req.params.id;
        const admin = await Admin.findById(adminId);
    
        if (!admin) {
            return res.status(404).json({
                status: false,
                message: 'Admin Not Found'
            });
        }
    
        res.status(200).json({
            status: true,
            message: 'Fetched Admin Successfully',
            data: admin
        });

    } catch (error) {
        res.status(500).json({
          status: "failed",
          message: "Internal server error",
          error: error.message,
        });
    };
}


exports.updateAdmin = async (req, res) => {
    const adminId = req.params.id;
    const authenticatedUserId = req.user._id;
    try{
        if (adminId !== authenticatedUserId.toString() && !["superadmin"].includes(req.user.role)) {
            return res.status(403).json({
              status: false,
              message: "You are not authorized to update this admin",
            });
        }

        const admin = await Admin.findByIdAndUpdate(
            adminId,
            { $set: req.body },
            { new: true }
        );

        if (!admin) {
            return res.status(404).json({
                status: false,
                message: 'Admin Not Found'
            });
        };

        res.status(201).json({
            status: true,
            message: 'Admin Updated Successfully',
            data: admin
        })
    } catch (error) {
        res.status(500).json({
          status: "failed",
          message: "Internal server error",
          error: error.message,
        });
    };
}


exports.deleteAdmin = async (req, res) => {
    const adminId = req.params.id;
    const authenticatedUserId = req.user._id;
    try{
        if (adminId !== authenticatedUserId.toString() && !["superadmin"].includes(req.user.role)) {
            return res.status(403).json({
              status: false,
              message: "You are not authorized to delete this admin",
            });
        }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({
                status: false,
                message: 'Admin Not Found',
            });
        }
        await Admin.findByIdAndDelete(adminId);

        res.status(200).json({
            status: true,
            message: 'Admin Updated Successfully',
            data: admin
        })
    } catch (error) {
        res.status(500).json({
          status: "failed",
          message: "Internal server error",
          error: error.message,
        });
    };

}