const mongoose= require('mongoose')

const chatSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, // Jo bhi user Logdin hoga uski id milgi Middlware se auth.middleware.js se 
        ref: 'user',    // Reference to the user model
        required: true
    },
    tittle:{
        type: String,   // Jo Frontend aa raha hau hoga req.body me 
        required: true
    
    },
    lastActivity:{
        type: Date, // Date type ka hona chahiye
        default: Date.now  // default me set hoti hogi bina koi value diye
    },


},{timestamps:true})
const chatModel = new mongoose.model('chat',chatSchema)
module.exports = chatModel