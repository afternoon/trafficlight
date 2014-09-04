#!/usr/local/bin/node
/* global require, module */

var portName = '/dev/cu.usbserial-A602U1ZL',
    jenkinsUrl = 'http://jenkins.test.wonga.com';

var buildFilter = function (job) {
  return job.name.indexOf('ivy-') !== -1 && 
    job.name.indexOf('quarantine') === -1 &&
    job.color !== 'disabled';
};

var SerialPort = require('serialport').SerialPort,
    Jenkins = require('jenkins'),
    Relay = require('../lib/relay');
    TrafficLight = require('../lib/trafficlight');

var serialPort = new SerialPort(portName, {baudrate: 9600}, false),
    relay = new Relay(serialPort),
    jenkins = Jenkins(jenkinsUrl),
    tl = new TrafficLight(relay, jenkins);

tl.update(buildFilter);
