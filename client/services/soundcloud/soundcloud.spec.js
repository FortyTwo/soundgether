'use strict';

describe('Service: soundcloud', function () {

  beforeEach(module('soundgether'));

  var soundcloud;
  beforeEach(inject(function (_soundcloud_) {
    soundcloud = _soundcloud_;
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
