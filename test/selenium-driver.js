var assert = require('assert');
var fs = require('fs');
var webdriver = require('browserstack-webdriver');
var test = require('browserstack-webdriver/testing');
var objectMerge = require('object-merge');

var browserStackConfig = {
  'browserstack.local' : 'true',
  'browserstack.user' : '',
  'browserstack.key' : '',
  'project': 'Alerter Module'
}

var driver;

//If browser_version is not specified, the latest version is used
var setups = [
  {browser: 'Chrome'},
  {browser: 'Chrome', browser_version: '35.0'},
  {browser: 'Safari'},
  {browser: 'Safari', browser_version: '6.1'},
  {browser: 'IE'},
  {browser: 'IE', browser_version: '10.0'},
  {browser: 'IE', browser_version: '9.0'},
  {browser: 'Firefox'},
  {browser: 'Firefox', browser_version: '30.0'},
  {device: 'iPhone 5S'},
  {device: 'iPhone 6'},
  {device: 'LG Nexus 4'},
  {device: 'Motorola Razr'}
];

function setupDriver(capabilities) {
  driver = new webdriver.Builder().
    usingServer('http://hub.browserstack.com/wd/hub').
    withCapabilities(capabilities).
    build();
  return driver;
}

setups.forEach(function (setup) {

  var setupDescription;
  if (setup.browser) {
    setupDescription = ' in ' + setup.browser +
    ' ' + (setup.browser_version || 'latest');
  } else if (setup.device) {
    setupDescription = ' on ' + setup.device;
  }

  test.describe('Mocha tests should pass' + setupDescription, function() {

    test.before(function() {
      var capabilities = objectMerge(browserStackConfig, setup);
      driver = setupDriver(capabilities);
      driver.get('http://localhost:8080/test/mocha/test.html');
    });

    test.after(function() { driver.quit(); });

    test.it('all tests pass', function() {
      driver.wait(function() {
        return driver.executeScript('return mocha_finished;').then(function(finished) {
          if (!finished) return false;

          return driver.executeScript('return mocha_stats;').then(function(stats) {
            assert(stats.tests > 0, 'No mocha tests were run');
            assert(stats.failures <= 0, 'Tests failed, run manually' + setupDescription + ' for details');
            if (!stats.failures) return true;

            return driver.executeScript('return mocha_failures;').then(function(failures) {
              for (var i = 0; i < failures.length; ++i) {
                var prefix = '    ' + (i + 1) + '. ';
              }
              return true;
            });
          });
        });
      });
    });
  });
});