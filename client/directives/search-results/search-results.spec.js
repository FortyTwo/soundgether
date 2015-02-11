'use strict';

describe('Directive: search-results', function () {

  beforeEach(module('soundgether', 'templates'));

  var element, scope;

  beforeEach(inject(function($compile, $rootScope){
    scope = $rootScope.$new();
    element = angular.element('<search-results></search-results>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });
});
