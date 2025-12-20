const express = require('express')

const authMiddleware = require('../Middleware/auth.middleware.js')
const chatController = require('../controllers/chat.controller.js')
const  routes = express.Router()// pure express call nahi kiya sirf router calll kiya

routes.post('/', authMiddleware.authUser,chatController.createChat) // authUser is a middleware and createChat is a controller function



/* GET /api/chat/ */
routes.get('/', authMiddleware.authUser, chatController.getChats)

routes.get('/search/:query', authMiddleware.authUser, chatController.searchChats);

/* GET /api/chat/messages/:id */
routes.get('/messages/:id', authMiddleware.authUser, chatController.getMessages)

routes.delete('/:id', authMiddleware.authUser, chatController.deleteChat)

module.exports=routes
