import WebSocket from 'ws';
import { Server } from 'http';
import { MessageModel } from '../database/models/message'

export const setupWebSocket = (server: Server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
      // Handle incoming messages
      const parsedMessage = JSON.parse(message.toString());

      // Save the message to MongoDB
      const savedMessage = await MessageModel.create(parsedMessage);

      // Broadcast the message to both users
      wss.clients.forEach((client) => {
        if (client !== ws) {
          client.send(JSON.stringify(savedMessage));
        }
      });
    });
  });
};
