const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectToMongoDB = require('./config/database');
const signupRoutes = require('./routes/signupRoute');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
connectToMongoDB();

// Middlewares for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use('/signup', signupRoutes);
app.use('/chat', chatRoutes);
app.use(express.static('public'));
// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    // Notify room that a new user has joined
    io.to(room).emit('message', { user: 'admin', text: `${username} has joined the room.` });
  });

  socket.on('sendMessage', (message, room) => {
    io.to(room).emit('message', { user: socket.id, text: message });
  });

  socket.on('leaveRoom', ({ username, room }) => {
    socket.leave(room);
    // Notify room that a user has left
    io.to(room).emit('message', { user: 'admin', text: `${username} has left the room.` });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});
