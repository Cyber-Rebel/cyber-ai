require('dotenv').config()
const app = require('./src/index')
const db = require('./src/db/db.js')

const { createServer } = require("http");
const socketserver = require('./src/socket/socket.js');

const PORT = process.env.PORT;

if (!PORT) {
  console.error('ERROR: PORT environment variable is not set!');
  process.exit(1);
}

const startServer = async () => {
  try {
     db();     // <-- wait for DB connection

    const httpserver = createServer(app);
    
    socketserver(httpserver);

    httpserver.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (error) {
    console.log("❌ Database connection failed", error);
    process.exit(1);
  }
};

startServer();
