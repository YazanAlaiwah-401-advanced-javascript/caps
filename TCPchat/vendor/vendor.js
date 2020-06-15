'use strict';
require('dotenv').config();
const net = require('net');
const client = new net.Socket();
const faker = require('faker');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
client.connect(PORT, HOST, () => {
  console.log('logger got connected');
});

setInterval(function () {
  let obj = {
    store: process.env.STORE,
    orderID: faker.random.uuid(),
    customer: faker.name.findName(),
    address: faker.address.city(),
  };
  let event = JSON.stringify(obj);
  client.write(event);
}, 5000);
const messages = [];
client.on('data', function (data) {
  let eventObj = JSON.parse(data);
  if (eventObj.event == 'delivered') {
    console.clear();
    messages.push(eventObj.id);
    messages.forEach((msg) => console.log(`Thank you for delivering ${msg}`));
  }
});
