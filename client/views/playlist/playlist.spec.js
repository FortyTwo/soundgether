'use strict';

describe('Controller: PlaylistCtrl', function () {

  beforeEach(module('soundgether'));

  var MainCtrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('PlaylistCtrl', {
      $scope: scope,
      playlist: {
        tracks: []
      }
    });
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
