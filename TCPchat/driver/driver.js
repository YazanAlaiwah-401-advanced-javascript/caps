'use strict';
const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
client.connect(PORT, HOST, () => {
  console.log('logger got connected');
});
client.on('data', function (data) {
  let event = JSON.parse(data);
  if (event.event != 'transit') {
    console.log(event.event, event.id);
  }
});
client.on('close', function () {
  console.log('Logger Connection got closed');
});
