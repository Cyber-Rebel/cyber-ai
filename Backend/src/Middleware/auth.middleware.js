const UserModels = require("../Models/user.models");
const jwt = require("jsonwebtoken");


const authUser = async (req, res, next) => {
  try {
        const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await UserModels.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to req
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(500).json({ message: "cheak Auth creditical" });
  }
};

module.exports = {
  authUser
};
