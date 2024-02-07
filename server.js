const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB connection
mongoose.connect('mongodb://localhost/chatapp', { useNewUrlParser: true });

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', ({ room }) => {
    socket.join(room);
    // Handle joining room
  });

  socket.on('leaveRoom', ({ room }) => {
    socket.leave(room);
    // Handle leaving room
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});
