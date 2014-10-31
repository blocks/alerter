var template = require('./template.hbs');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

inherits(Alerter, EventEmitter);
module.exports = Alerter;

function Alerter (options) {
  if (!(this instanceof Alerter)) return new Alerter(options);

  options = options || {};
  options = _setAlerterDefaults(options);
  this.template = template;

  if (options.prependTo.jquery) {
    this.prependTo = options.prependTo[0];
  } else {
    this.prependTo = document.querySelector(options.prependTo);
  }

  this.alerts = [];

  return this;
}

Alerter.prototype.create = function (options) {
  var instance = this;
  options = _setAlertDefaults(options);

  if (instance.prependTo.nodeName === 'BODY') {
    options.pageWide = true;
  }

  var tempDiv = document.createElement('div');
  this.prependTo.insertBefore(tempDiv, this.prependTo.firstChild);
  tempDiv.outerHTML = this.template(options);
  var alert = document.getElementById(options.id);

  this.emit('alertCreated', alert);

  var closeButton = alert.querySelector('.alert__close-button');

  if (closeButton) {
    closeButton.addEventListener('click', function(){
      instance.dismiss(alert);
    });
  }

  this.alerts.push(alert);

  return alert;
};

Alerter.prototype.dismiss = function (alert) {
  var instance = this;
  alert = alert || this.alerts;

  if (Array.isArray(alert)) {
    alert.forEach(function(alert){
      removeAlert(alert);
    });
  } else {
    removeAlert(alert);
  }

  function removeAlert(alert){
    if (alert.parentNode) {
      alert.parentNode.removeChild(alert);
      instance.emit('alertDismissed', alert);
    }
  }
};

//Private Functions
function _setAlerterDefaults(options) {
  options.prependTo = options.prependTo || 'body';

  //This is the closest we can get to checking if the template option is a
  //compiled handlebars template before using it
  if (typeof options.template === 'function') {
    template = options.template;
  }

  return options;
}

function _setAlertDefaults(options) {
  options.message = options.message || 'Alert';
  options.details = options.details || false;
  options.errors = options.errors || false;
  options.type = options.type || false;
  options.id = 'alert-' + Math.floor(Math.random() * 10000);//random number

  return options;
}