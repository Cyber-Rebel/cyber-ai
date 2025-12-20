const UserModels = require('../Models/user.models.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken'  )

const LoginHandler = async(req,res)=>{
const {email,password} = req.body;
const UserAlerdyexits = await UserModels.findOne({
    email:email
})
if(!UserAlerdyexits){
  return res.status(404).json({message:"User is not founded"})
}

const isPasswordValid = await bcrypt.compare(password,UserAlerdyexits.password)
if(!isPasswordValid){
  return res.status(400).json({message:"Password not vaild "})
}

const token = jwt.sign({id:UserAlerdyexits.id},process.env.JWT_SECRET)

res.cookie('token',token)// set as on cookie
res.status(200).json({
  message:"Sucessfully Login "
  ,    user:{
      email:UserAlerdyexits.email,
      firstName:UserAlerdyexits.fullName.firstName,
      lastName:UserAlerdyexits.fullName.lastName,
      id:UserAlerdyexits.id,
      avatarsUrl:UserAlerdyexits.avatarsUrl,
      
    }
})


}




const SingupHandler = async(req,res)=>{
const {fullName:{firstName,lastName},email,password,gender} =req.body;

const UserAlerdyexits = await UserModels.findOne({
    email:email
})
if(UserAlerdyexits){
    return res.status(400).json(
      {message:"User Alerdy Exits in database"}
    )
}


const hashpassword  = await bcrypt.hash(password,10)

const  avatarsUrl = `https://avatar.iran.liara.run/public/${gender==='male'?'boy':'girl'}?username=${firstName}`
  const user = await UserModels.create({
    email:email,
    password:hashpassword,
    fullName:{
        firstName,lastName
    },
    gender:gender,
    avatarsUrl:avatarsUrl
  })

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)// jar object pass kela tar token madeh ek obje yeto kya madhe ek madhe apla data and secondt iat kuch hota hae 

    res.cookie('token',token)
  res.status(201).json({
    message:"user create succesfully !",
    user:{
      email:user.email,
      firstName:user.fullName.firstName,
      lastName:user.fullName.lastName,
      id:user.id,
      avatarsUrl:user.avatarsUrl,
      
    }
  })
// ek saath 2 chiye res kar sakte hae 
}


const authdata = async(req,res)=>{
  res.status(200).json({
    message:"user is auth",
    user:{
      email:req.user.email,
      firstName:req.user.fullName.firstName,
      lastName:req.user.fullName.lastName,
      id:req.user.id,
      avatarsUrl:req.user.avatarsUrl,
      
    }
  })
  
}
const logout = async(req,res)=>{ 
 res.clearCookie('token') // cookie clear karne ke liye
 res.status(200).json({
  message:"user logout succesfully"

 })}









module.exports={
  SingupHandler,
    LoginHandler
    ,authdata,
    logout
}
