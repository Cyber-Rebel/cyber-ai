const express = require('express')
const app = express()
const path = require('path')
const AuthRouter = require('./routes/auth.routes.js')
const ChatRouter = require('./routes/chat.routes.js')

const cors = require('cors')
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000','https://cyber-ai-eta.vercel.app'],
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
