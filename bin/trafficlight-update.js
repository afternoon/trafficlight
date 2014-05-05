#!/usr/bin/env node
/* global require */

var SerialPort = require('serialport').SerialPort,
    Jenkins = require('jenkins'),
    Relay = require('../lib/relay');
    TrafficLight = require('../lib/trafficlight');

var portName = '/dev/cu.Bluetooth-Incoming-Port',
    // '/dev/cu.usbserial-A602U1ZL',
    serialPort = new SerialPort(portName, {baudrate: 9600}),
    jenkinsUrl = 'http://jenkins.test.wonga.com',
    jenkins = Jenkins(jenkinsUrl),
    relay = new Relay(serialPort),
    tl = new TrafficLight(relay, jenkins);

tl.update();
