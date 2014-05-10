/* global require, module */

var qserialport = require('./qserialport');

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

  this.close = function () {
    return portPromise.then(function (port) {
      return port.close();
    });
  };
};

module.exports = Relay;
