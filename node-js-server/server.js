const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Initialize express app
const app = express();

// Enable CORS
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200", // Angular app URL
    methods: ["GET", "POST"]
  }
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Listen for WebSocket connections
io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle incoming messages from clients
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    // Broadcast the message to all clients
    io.emit('message', msg);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
