const express = require('express')
const {LoginHandler,SingupHandler,authdata,logout} = require('../controllers/auth.controller.js')
const authMiddleware = require('../Middleware/auth.middleware.js')

const router = express.Router()
router.post('/login',LoginHandler)
router.post('/register',SingupHandler)
router.get('/me',authMiddleware.authUser,authdata)
router.get('/logout',authMiddleware.authUser,logout)

module.exports= router