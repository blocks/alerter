var assert = require('assert');
var $ = require('jquery');
var Alerter = require('../build/alerter.js');
var Handlebars = require('handlebars');
var testTemplate = require('./test-template.hbs');
var sinon = require('sinon');

describe('Alerter Module', function() {

  beforeEach(function(){
    $('body').append('<div id="test-element"></div>');
  });

  afterEach(function(){
    $('#test-element').remove();
  });

  describe('Events', function() {
    it('Emits events', function(done){
      var myAlerter = new Alerter({
        prependTo: '#test-element'
      });
      var spy = sinon.spy(myAlerter, 'emit');
      myAlerter.create({message: 'test'});
      assert(spy.called);
      done();
    });
  });

  describe('Methods', function() {
    var myAlerter, testAlert;
    it('Inserts an alert to the DOM with the create method', function(done){
      myAlerter = new Alerter({
        prependTo: '#test-element'
      });
      testAlert = myAlerter.create({message: 'test'});
      var alerts = $('#test-element .alert');
      assert(alerts.length === 1);
      done();
    });
    it('Removes alerts from the DOM with the dismiss method', function(done){
      myAlerter.dismiss(testAlert);
      var alerts = $('#test-element .alert');
      assert(alerts.length === 0);
      done();
    });
  });

  describe('prependTo parameter', function() {

    it('accepts a DOM selector string as the element to prepend alerts into', function(done){
      var myAlerter = new Alerter({
        prependTo: '#test-element'
      });
      myAlerter.create({message: 'test'});
      var alerts = $('#test-element .alert');
      assert(alerts.length === 1);
      done();
    });

    it('accepts a DOM Node as the element to prepend alerts into', function(done){
      var myAlerter = new Alerter({
        prependTo: document.querySelector('#test-element')
      });
      myAlerter.create({message: 'test'});
      var alerts = $('#test-element .alert');
      assert(alerts.length === 1);
      done();
    });

    it('accepts a jQuery object as the element to prepend alerts into', function(done){
      var testElement = $('#test-element');
      var myAlerter = new Alerter({
        prependTo: testElement
      });
      myAlerter.create({message: 'test'});
      var alerts = $('#test-element .alert');
      assert(alerts.length === 1);
      done();
    });

  });

  describe('dimissable parameter', function () {
    it('creates an alert with a dismiss button', function(done){
      var myAlerter = new Alerter({
        prependTo: '#test-element'
      });
      myAlerter.create({message: 'test', dismissable: 'true'});
      var closeButton = $('#test-element .alert .alert__close-button');
      assert(closeButton.length === 1);
      done();
    });
  });

  describe('template parameter', function() {

    it('accepts a precompiled handlebars template that overrides the default template', function(done){
      var myAlerter = new Alerter({
        prependTo: '#test-element',
        template: testTemplate
      });
      myAlerter.create({message: 'test'});
      var alerts = $('#test-element .custom-alert');
      assert(alerts.length === 1);
      done();
    });

  });

});
