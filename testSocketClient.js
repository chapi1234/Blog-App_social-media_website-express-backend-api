const { io } = require('socket.io-client');

const socket = io('http://localhost:5000');

socket.on('connect', () => {
    console.log('Connected to WebSocket server:', socket.id);
    socket.emit('sendMessage', { sender: 'User1', content: 'Hello, World!' });
});

socket.on('receiveNotification', (data) => {
    console.log('New notification received:', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});