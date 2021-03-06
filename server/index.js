const express = require('express');
const { Server: WebSocketServer } = require('ws');
const router = require('./routes');
const { onConnect } = require('./webSocket');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = express()
  .use(router)
  .listen(PORT, () => console.log(`slackk-casa listening on port ${PORT}`));

// create a WebSocket server and attach to Express server to share ports
const wss = new WebSocketServer({ server });

// event handler for each client connection, passes to webSocket.js helpers
wss.on('connection', ws => onConnect(ws, wss));

module.exports = server;
