'use strict';
require('dotenv').config();
const event = require('./events.js');
const faker = require('faker');
require('./caps.js');
setInterval(() => {
  let order = {
    store: process.env.STORE,
    orderID: faker.random.uuid(),
    customer: faker.name.findName(),
    address: faker.address.city(),
  };
  event.emit('pickup', order);
}, 5000);
