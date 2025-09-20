const app = require('./src/index')
const db = require('./src/db/db.js')
require('dotenv').config()
const { createServer } = require("http");
const socketserver = require('./src/socket/socket.js');
db()
const httpserver = createServer(app)
socketserver(httpserver)


httpserver.listen(3000,(req,res)=>{
console.log('server listen on port 3000')
})