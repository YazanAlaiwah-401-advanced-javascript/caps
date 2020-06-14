'use strict';
require('dotenv').config();
const event = require('./events.js');
const order = require('./vendor');
require('./caps.js');
console.log(order);
function all(paylod) {
  setTimeout(() => {
    console.log('DRIVER: picked up ' + paylod.orderID);
    event.emit('in-transit', paylod);
    setTimeout(() => {
      console.log('DRIVER: delivered up ' + paylod.orderID);
      console.log('VENDOR: Thank you for delivering ' + paylod.orderID);
      event.emit('delivered', paylod);
    }, 3000);
  }, 1000);
}

module.exports = all;
