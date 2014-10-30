var assert = require('assert');
var $ = require('jquery');
var Alerter = require('../build/alerter.js');
var Handlebars = require('handlebars');
var testTemplate = require('./test-template.hbs');
var sinon = require('sinon');

describe('Alerter Module', function() {

  beforeEach(function(){
    var testElement = $('#test-element');
    if (testElement) {
      testElement.remove();
    }
    testElement = document.createElement('div');
    testElement.id = 'test-element';
    document.body.appendChild(testElement);
  });

  describe('Events', function() {
    it('Emits events', function(done){
      var myAlerter = new Alerter({
        prependTo: 'body'
      });
      var spy = sinon.spy(myAlerter, 'emit');
      myAlerter.create({
        message: 'Heyo whaddayakno?',
        details: 'Here are some details.',
        errors: ['Error One', 'Error Two'],
        type: 'error',
        dismissable: true
      });
      assert(spy.called);
      done();
    });
  });

  describe('prependTo parameter', function() {

    it('accepts a DOM selector string as the element prepend alerts into', function(done){
      var myAlerter = new Alerter({
        prependTo: 'body'
      });
      done();
    });

    it('accepts a jQuery object as the element prepend alerts into', function(done){
      var jQueryElement = $('#test-element');
      var myAlerter = new Alerter({
        prependTo: jQueryElement
      });
      done();
    });

  });

  describe('template parameter', function() {

    it('accepts a precompiled handlebars template that overrides the default template', function(done){
      var myAlerter = new Alerter({
        template: testTemplate
      });
      done();
    });

  });

});
