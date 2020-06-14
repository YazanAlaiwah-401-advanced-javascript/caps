'use strict';
const event = require('../moduler/events.js');
require('../moduler/caps.js');

describe('EVENT MODUEL', () => {
  jest.spyOn(console, 'log').mockImplementation();
  it('its should work with emit puckup', () => {
    event.emit('pickup', {});
    expect(console.log).toHaveBeenCalled();
  });

  it('its should work with emit in-transit', () => {
    event.emit('in-transit', {});
    expect(console.log).toHaveBeenCalled();
  });

  it('its should work with emit delivered', () => {
    event.emit('delivered', {});
    expect(console.log).toHaveBeenCalled();
  });
});
