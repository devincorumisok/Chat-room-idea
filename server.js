const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('join', (name) => {
        console.log(`${name} joined`);
        io.emit('chat message', `${name} has joined the chat`);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});