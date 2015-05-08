'use strict';

describe('prettyTime filter', function () {

  beforeEach(module('soundgether'));

  var prettyTime;

  beforeEach(inject(function ($filter) {
    prettyTime = $filter('prettyTime');
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
