/* eslint-disable comma-dangle */
'use strict';
const event = require('./events.js');
const all = require('./driver.js');
event.on('pickup', pickup);
event.on('in-transit', inTransit);
event.on('delivered', delivered);

function pickup(paylod) {
  console.log('EVENT ', eventResulte(paylod, 'pickup'));
  all(paylod);
}

function inTransit(paylod) {
  console.log('EVENT ', eventResulte(paylod, 'in-transit'));
}

function delivered(paylod) {
  console.log('EVENT ', eventResulte(paylod, 'delivered'));
}

function eventResulte(paylod, event) {
  let time = new Date();
  let resulte = {
    event,
    time,
    paylod,
  };
  return resulte;
}

require('./vendor.js');
