const express = require('express')
const authmiddlware = require('./Middleware/auth.middleware.js')
const app = express()
const AuthRouter = require('./routes/auth.routes.js')
const ChatRouter = require('./routes/chat.routes.js')
const path = require('path')

const cors = require('cors')
app.use(cors({
      origin:'http://localhost:5173',
       credentials: true,
    }))
    // credentials: true, // cookeis se kam kar sakt data read karna bhejtna rakan matlab cookis ke saath kam kar sak hto 

const cookieparser = require('cookie-parser')

app.use(express.json())
app.use(cookieparser())
// Done ai 
app.use(express.static(path.join(__dirname, '../public')));




app.use('/api/auth',AuthRouter)
app.use('/api/chat',ChatRouter)

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});



module.exports=app;