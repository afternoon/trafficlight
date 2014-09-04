/* global describe, it, jasmine */

var TrafficLight = require('../lib/trafficlight');

describe('TrafficLight', function () {
  describe('update', function () {
    var mockRelay, mockJobList, mockJenkins, tl;

    var allBuildsPassing = [{
      'color': 'blue',
      'name': 'example',
      'url': 'http://example.com/job/example/'
    }];

    var someBuildsFailing = [{
      'color': 'red',
      'name': 'example',
      'url': 'http://example.com/job/example/'
    }];

    beforeEach(function () {
      mockRelay = jasmine.createSpyObj('relay', ['enable', 'disable']);
      mockJobList = jasmine.createSpy('jenkins.job.list');
      mockJenkins = {job: {list: mockJobList}};

      tl = new TrafficLight(mockRelay, mockJenkins);
    });

    it('should get job status from Jenkins and turn relay 1 off and relay 2 ' +
       'on if all builds are passing', function () {
      // arrange
      mockJobList.and.callFake(function (callback) {
        callback(undefined, allBuildsPassing);
      });

      // act
      tl.update();

      // assert
      expect(mockJobList).toHaveBeenCalled();
      expect(mockRelay.enable).toHaveBeenCalledWith(2);
      expect(mockRelay.disable).toHaveBeenCalledWith(1);
    });

    it('should get job status from Jenkins and turn relay 1 on and relay 2 ' +
       'off if any builds are failing', function () {
      // arrange
      mockJobList.and.callFake(function (callback) {
        callback(undefined, someBuildsFailing);
      });

      // act
      tl.update();

      // assert
      expect(mockJobList).toHaveBeenCalled();
      expect(mockRelay.enable).toHaveBeenCalledWith(1);
      expect(mockRelay.disable).toHaveBeenCalledWith(2);
    });
  });
});
