const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Moderator = require("../model/Moderator")
const Admin = require("../model/Admin")
const SuperAdmin = require("../model/SuperAdmin")
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  const token = authHeader.split(" ")[1]; 

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
  
      const message =
        err.name === "TokenExpiredError"
          ? "Token Expired"
          : "Invalid Token";
      return res.status(403).json({ message });
    }

    req.user = user;
    next();
  });
};


const verifyRole = roles => async(req, res, next) => {
  const userId = req.user._id;

  let user;
  
  const member = await User.findById(userId);
  const moderator = await Moderator.findById(userId);
  const admin = await Admin.findById(userId);
  const superadmin = await SuperAdmin.findById(userId);
  
  if (member) {
      user = member;
  } else if (admin) {
      user = admin;
  } else if (superadmin) {
      user = superadmin;
  }else if (moderator) {
      user = moderator;
  }
  console.log('User:', user);
  console.log('User Role:', user.role); 
  console.log('Required Role:', roles); 
  
  if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ success: false, message: "Access Denied" });
  }
  
  next();
}


module.exports = { verifyToken, verifyRole };