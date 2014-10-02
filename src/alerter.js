var template = require('./template.hbs');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

inherits(Alerter, EventEmitter);
module.exports = Alerter;

function Alerter (options) {
  if (!(this instanceof Alerter)) return new Alerter(options);

  options = options || {};
  options = setDefaults(options);

  if (options.template) {
    template = options.template;
  }

  if (options.appendTo.jquery) {
    this.appendTo = options.appendTo[0];
  } else {
    this.appendTo = document.querySelector(options.appendTo);
  }

  this.appendBefore = this.appendTo.firstChild;
}

Alerter.prototype.create = function (message, type) {

  var instance = this;

  var alert = document.createElement('div');
  alert.innerHTML = template({type: type, message: message});
  this.appendTo.insertBefore(alert, this.appendBefore);
  this.emit('alertCreated', alert);

  var closeButton = alert.querySelector('.alert-message__close-button');

  closeButton.addEventListener('click', function(){
    instance.dismiss(alert);
  });

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
  return options;
}