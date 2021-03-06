'use strict';

module.exports = function (config) {
  config.set({

    basePath: 'client',

    frameworks: ['jasmine'],

    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/',
      moduleName: 'templates'
    },

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-socket-io/socket.min.js',
      'bower_components/restangular/dist/restangular.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular-audio/app/angular.audio.js',
      'bower_components/moment/moment.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/gsap/src/uncompressed/TweenMax.js',
      'app.js',
      'views/**/*.js',
      'services/**/*.js',
      'directives/**/*.js',
      'directives/**/*.html',
      'filters/**/*.js'
    ],

    exclude: [
      'views/**/*.e2e.js',
      'services/socket/socket.service.js'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    // possible values:
    // config.LOG_DISABLE
    // config.LOG_ERROR
    // config.LOG_WARN
    // config.LOG_INFO
    // config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true
  });
};
