const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const UserModels = require("../Models/user.models.js");

// Authentication middleware for socket connections
const authenticateSocket = async (socket, next) => {
  try{
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    if (!cookies.token) {
      next(new Error("Authetntication error"));
    }
    try {
      const decode =  jwt.verify(cookies.token, process.env.JWT_SECRET);
    

      const user = await UserModels.findById({ _id: decode.id }).select(
        "-password"
      );
      if (!user) {
       return next(new Error("User not found")); // res not so next new Erro
      }

      socket.user = user; 
    } catch (error) {
      console.error("Authentication error:", error);
      return next(new Error("Authentication error"));
    }
    next();
  }
  catch(error){
    // Authentication error handled
    return next(new Error("Authentication error"));
  }
};

module.exports = { authenticateSocket };
