require('dotenv').config()
const cookieparser = require('cookie-parser')
const express = require('express')
const app = express()
const path = require('path')
const AuthRouter = require('./routes/auth.routes.js')
const ChatRouter = require('./routes/chat.routes.js')

const cors = require('cors')
// Get frontend URLs from environment variables
const allowedOrigins = [
    "http://13.49.82.81",
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true, // cookeis se kam kar sakt data read karna bhejtna rakan matlab cookis ke saath kam kar sak hto 
}))

app.use(express.json())
app.use(cookieparser())
// Done ai 
app.use(express.static(path.join(__dirname, '../public')));




app.use('/api/auth',AuthRouter)
app.use('/api/chat',ChatRouter)

// Health check endpoint for Docker
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});



module.exports=app;
