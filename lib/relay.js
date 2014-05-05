/* global require, module */

qserialport = require('./qserialport');

var Relay = function (serialPort) {
  var portPromise = qserialport(serialPort);

  var writeToPort = function (data) {
    return portPromise.then(function (port) {
      return port.write(data);
    });
  };

  this.enable = function (relayNumber) {
    return writeToPort([0xff, relayNumber, 0x01]);
  };

  this.disable = function (relayNumber) {
    return writeToPort([0xff, relayNumber, 0x00]);
  };
};

module.exports = Relay;
