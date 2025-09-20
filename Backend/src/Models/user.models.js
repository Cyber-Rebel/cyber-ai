const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    email: {
    type: String,
    unique: true,
    required: true
    },
    fullName:{

        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
    password:{
        type:String,
        
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true

    },
    avatarsUrl:{
        type:String,
        required:true
    }
    
},{
    timestamps:true
})

const UserModels =  mongoose.model('user',userSchema) // use user not use users more reable hot hae es liye

     
module.exports = UserModels;