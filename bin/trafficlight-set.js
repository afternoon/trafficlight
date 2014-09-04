#!/usr/local/bin/node
/* global require, module */

var Q = require('q'),
    SerialPort = require('serialport').SerialPort,
    Relay = require('../lib/relay');

var portName = '/dev/cu.usbserial-A602U1ZL';

var serialPort = new SerialPort(portName, {baudrate: 9600}, false),
    relay = new Relay(serialPort);

module.exports = function (light1, light2) {
  var actions = [];
  
  if (light1) { actions.push(relay.enable(1)); }
  else { actions.push(relay.disable(1)); }

  if (light2) { actions.push(relay.enable(2)); }
  else { actions.push(relay.disable(2)); }

  return Q.all(actions).then(function () { relay.close(); });
};
