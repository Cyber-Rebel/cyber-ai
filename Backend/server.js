require('dotenv').config()
const app = require('./src/index')
const db = require('./src/db/db.js')

const { createServer } = require("http");
const socketserver = require('./src/socket/socket.js');
db()
const httpserver = createServer(app)
socketserver(httpserver)


const PORT = process.env.PORT;

if (!PORT) {
  console.error('ERROR: PORT environment variable is not set!');
  process.exit(1);
}

httpserver.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});