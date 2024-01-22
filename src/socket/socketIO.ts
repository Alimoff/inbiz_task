// Import necessary modules
const socketIO = require('socket.io');

// Function to initialize Socket.IO in the server
export const initSocketIO = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('New user connected');

        // Emit a welcome message to the user
        socket.emit('newMessage', {
            from: 'Server',
            text: 'Welcome to the e-commerce chat!',
            createdAt: new Date().getTime()
        });

        // Listen for messages from the user
        socket.on('createMessage', (newMessage) => {
            console.log('New message from user:', newMessage);

            // You can broadcast this message to sellers or other users
            io.emit('newMessage', {
                from: newMessage.from,
                text: newMessage.text,
                createdAt: new Date().getTime()
            });
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};
