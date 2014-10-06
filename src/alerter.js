var template = require('./template.hbs');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

inherits(Alerter, EventEmitter);
module.exports = Alerter;

function Alerter (options) {
  if (!(this instanceof Alerter)) return new Alerter(options);

  options = options || {};
  options = setAlerterDefaults(options);
  this.template = template;

  if (options.appendTo.jquery) {
    this.appendTo = options.appendTo[0];
  } else {
    this.appendTo = document.querySelector(options.appendTo);
  }

  this.appendBefore = this.appendTo.firstChild;

  this.alerts = [];

  return this;
}

Alerter.prototype.create = function (options) {
  var instance = this;
  options = setAlertDefaults(options);

  if (instance.appendTo.nodeName === 'BODY') {
    options.pageWide = true;
  }

  var alert = document.createElement('div');
  alert.innerHTML = this.template(options);
  this.appendTo.insertBefore(alert, this.appendBefore);
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
function setAlerterDefaults(options) {
  options.appendTo = options.appendTo || 'body';

  //This is the closest we can get to checking if the template option is a
  //compiled handlebars template before using it
  if (typeof options.template === 'function') {
    template = options.template;
  }

  return options;
}

function setAlertDefaults(options) {
  options.message = options.message || 'Alert';
  options.details = options.details || false;
  options.errors = options.errors || false;
  options.type = options.type || 'info';

  return options;
}