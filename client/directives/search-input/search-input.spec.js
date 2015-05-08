'use strict';

describe('Directive: search-input', function () {

  beforeEach(module('soundgether', 'templates'));

  var element, scope;

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = angular.element('<search-input></search-input>');
    element = $compile(element)(scope);
    angular.element(document).find('body').append(element);
    scope.$apply();
  }));

  afterEach(function () {
    $(element).remove();
  });

  it('should create a wave at start', function () {
    expect($(element).find('.search-input--wave').length).toBe(1);
  });

  it('should create a wave div on click', function () {
    expect($(element).find('.search-input--wave').length).toBe(1);
    $(element).click();
    expect($(element).find('.search-input--wave').length).toBe(2);
  });

  it('should create multiples waves div on multiples clicks', function () {
    expect($(element).find('.search-input--wave').length).toBe(1);
    $(element).click();
    $(element).click();
    $(element).click();
    expect($(element).find('.search-input--wave').length).toBe(4);
  });

  it('should expand the wave well', function (done) {
    var wave = $(element).find('.search-input--wave');
    var rect = wave[0].getBoundingClientRect();
    setTimeout(function () {
      var rect2 = wave[0].getBoundingClientRect();
      expect(rect2.width).toBeGreaterThan(rect.width);
      done();
    }, 500);
  });

  it('should delete well the waves', function (done) {

    $(element).click();
    $(element).click();
    expect($(element).find('.search-input--wave').length).toBe(3);

    setTimeout(function () {
      expect($(element).find('.search-input--wave').length).toBe(0);
      done();
    }, 1.5e3);

  });

});
