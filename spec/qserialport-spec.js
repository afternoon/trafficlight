/* global describe, it, xit, jasmine */

qserialport = require('../lib/qserialport');

describe('qserialport', function () {
  var mockSerialPort;

  beforeEach(function () {
    mockSerialPort = jasmine.createSpyObj('serialPort', ['open', 'write']);
    mockSerialPort.open.and.callFake(function (onOpen) { onOpen(); });
    mockSerialPort.write.and.callFake(function (data, onWrite) { onWrite(); });
  });

  describe('open', function () {
    it('should return a promise', function () {
      // act
      var promise = qserialport(mockSerialPort);

      // assert
      expect(promise.then).toEqual(jasmine.any(Function));
    });
  });

  describe('write', function () {
    it('should return a promise which resolves to the port and any received ' +
       'data', function (done) {
      // arrange
      var promise = qserialport(mockSerialPort),
          resolveSpy = jasmine.createSpy('resolve');

      // act
      promise.then(function (port) {
        // assert
        expect(port.write).toEqual(jasmine.any(Function));

        // act some more
        writePromise = port.write('abc');

        // assert some more
        expect(writePromise.then).toEqual(jasmine.any(Function));

        // act some more
        writePromise.then(function (port, result) {
          expect(port).toBe(mockSerialPort);
          done();
        });
      });
    });
  });
});
