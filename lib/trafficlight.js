/* global require, module  */

var _ = require('lodash'),
    Q = require('q');

var TrafficLight = function (relay, jenkins) {
  var toggle = function (relay, disable, enable) {
    return Q.all([
      relay.disable(disable),
      relay.enable(enable)
    ]).then(function () {
      return relay.close();
    });
  };

  var turnOnRed = function (relay) { return toggle(relay, 2, 1); };

  var turnOnGreen = function (relay) { return toggle(relay, 1, 2); };

  this.update = function () {
    jenkins.job.list(function(err, jobs) {
      if (err) {
        console.log('couldn\'t get job data from jenkins');
        relay.close();
      }
      else {
        var buildBroken = _.any(jobs, {color: 'red'});

        if (buildBroken) {
          turnOnRed(relay);
        }
        else {
          turnOnGreen(relay);
        }
      }
    });
  };
};

module.exports = TrafficLight;
