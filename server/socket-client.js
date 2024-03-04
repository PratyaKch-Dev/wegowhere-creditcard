console.log("Socket client script started.");

const io = require('socket.io-client');
const socket = io('http://host.docker.internal:3000');
// const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to the server');
});

socket.on('paymentSuccess', (data) => {
    console.log('socket received:', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});

socket.on('error', (error) => {
    console.error('Error connecting to the server:', error);
});
