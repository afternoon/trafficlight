/* global require, module  */

var _ = require('lodash');

var TrafficLight = function (relay, jenkins, debug) {
  this.update = function () {
    jenkins.job.list(function(err, jobs) {
      if (!err) {
        if (_.any(jobs, {color: 'red'})) {
          relay.disable(1);
          relay.enable(2);
        }
        else {
          relay.enable(1);
          relay.disable(2);
        }
      }
    });
  };
};

module.exports = TrafficLight;
