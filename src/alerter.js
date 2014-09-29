var template = require('./template.hbs');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

inherits(Alerter, EventEmitter);
module.exports = Alerter;

function Alerter (options) {
  if (!(this instanceof Alerter)) return new Alerter(options);
  
}