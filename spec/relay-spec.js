/* global describe, it, jasmine */

var Relay = require('../lib/relay');

describe('Relay', function () {
  var mockSerialPort, relay;

  beforeEach(function () {
    mockSerialPort = jasmine.createSpyObj('serialPort', ['open', 'write']);
    mockSerialPort.open.and.callFake(function (onOpen) { onOpen(); });
    mockSerialPort.write.and.callFake(function (data, onWrite) { onWrite(); });

    relay = new Relay(mockSerialPort);
  });

  describe('enable', function () {
    it('should switch on relay 1 by sending FF 01 01 to the serial port when ' +
       'called with 1', function (done) {
      // act
      relay.enable(1).then(function (port) {
        // assert
        expect(mockSerialPort.open).toHaveBeenCalled();
        expect(mockSerialPort.write).toHaveBeenCalledWith([0xff, 0x01, 0x01],
          jasmine.any(Function));
        done();
      });
    });
  });

  describe('disable', function () {
    it('should switch off relay 2 by sending FF 02 00 to the serial port when ' +
       'called with 2', function (done) {
      // act
      relay.disable(2).then(function (port) {
        // assert
        expect(mockSerialPort.open).toHaveBeenCalled();
        expect(mockSerialPort.write).toHaveBeenCalledWith([0xff, 0x02, 0x00],
          jasmine.any(Function));
        done();
      });
    });
  });
});
