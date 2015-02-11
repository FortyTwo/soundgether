'use strict';

describe('prettyTime filter', function () {

  beforeEach(module('soundgether'));

  var prettyTime;

  beforeEach(inject(function ($filter) {
    prettyTime = $filter('prettyTime');
  }));

  it('should ...', function () {
    var text = 'bangular is awesome';
    expect(prettyTime(text)).toBe(text);
  });

});
