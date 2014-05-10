/* global require, module */

var Q = require('q');

var WritableSerialPort = function (port) {
  this.write = function (data) {
    var deferred = Q.defer();
    port.write(data, function (error, result) {
      if (error) {
        deferred.reject(error);
      }
      else {
        deferred.resolve(port);
      }
    });
    return deferred.promise;
  };

  this.close = function () {
    port.drain(function () {
      port.close();
    });
  };
};

var qserialport = function (port) {
  var deferred = Q.defer();

  port.open(function (error) {
    if (error) {
      deferred.reject(error);
    }
    else {
      deferred.resolve(new WritableSerialPort(port));
    }
  });

  return deferred.promise;
};

module.exports = qserialport;
