var template = require('./template.hbs');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

inherits(Alerter, EventEmitter);
module.exports = Alerter;

function Alerter (options) {
  if (!(this instanceof Alerter)) return new Alerter(options);

  options = options || {};
  options = setDefaults(options);
  this.template = template;

  if (options.appendTo.jquery) {
    this.appendTo = options.appendTo[0];
  } else {
    this.appendTo = document.querySelector(options.appendTo);
  }

  this.appendBefore = this.appendTo.firstChild;

  return this;
}

Alerter.prototype.create = function (message, type) {

  var instance = this;

  var templateOptions = {};
  templateOptions.message = message || 'Alert!';
  templateOptions.type = type || 'info';

  var alert = document.createElement('div');
  alert.innerHTML = this.template(templateOptions);
  this.appendTo.insertBefore(alert, this.appendBefore);
  this.emit('alertCreated', alert);

  var closeButton = alert.querySelector('.alert-message__close-button');

  if (closeButton) {
    closeButton.addEventListener('click', function(){
      instance.dismiss(alert);
    });
  }

  return alert;
};

Alerter.prototype.dismiss = function (alert) {

  if (alert.parentNode) {
    alert.parentNode.removeChild(alert);
  }

  this.emit('alertDismissed', alert);

  return alert;
};

//Private Functions
function setDefaults(options) {
  options.appendTo = options.appendTo || 'body';

  //This is the closest we can get to checking if the template option is a
  //compiled handlebars template before using it
  if (typeof options.template === 'function') {
    template = options.template;
  }

  return options;
}