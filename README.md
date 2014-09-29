Alerts is a UMD JavaScript module for displaying arbitrary messaging to communicate certain states in a web app.

An `Alerter()` instance does two things;
1) Injects alert messages along with markup templates into your page, and removes the markup when the alerts are dismissed.
2) Emits events when alerts are created or dismissed.

# Getting the Module
You can get the module in any one of the following ways;
- Download [the latest release](https://github.com/blocks/alerts/releases) from GitHub
- Or install with npm; `npm install alerter`
- Or install with Bower; `bower install alerter`

# Quick Start
To get started, you'll need to include the script on your page. To create an alert you can do;

```
var myAlerter = new Alerter({
  element: 'body'
});
```

You can then use the alert like this;

`myAlerter.create(message, 'warning');`

`myAlerter.dismiss(id);`

# Advanced Usage

## Options
There are several options available when you initialize a new `Alerter()` object;

### `element`
A DOM element, jQuery element, or selector string to refer to the placeholder element, where alerts will be injected. By default, alerts will be injected at the top of the `<body>`.

### `template`
A handlebars template. You can require the template using Browserify or RequireJS, or you can paste the template inline. See 'Customizing the Template' below. (Defaults to `false`).

## Customizing the Template
Out of the box, the Alerts module will generate BEM markup with the namespace `alert-message` that contains all of the markup needed to display the alert. If you want to customize the markup, you can pass in a handlebars template to the constructor using Browserify or RequireJS;

```
var customTemplate = require(../<path-to>/customTemplate.hbs);

var customAlerter = new Alerter({
    element: 'body',
    template: customTemplate
  });
```

## Events
Every instance of `Alerter` will emit events when an alert is created or dismissed. You can listen for these events to assist with transitions, modal dialogs, cleanup, etc in your app.

### `alertCreated`
Fires whenever an alert is created. Contains a payload object with the alert message and other data.

### `alertDismissed`
Fires whenever an alert message is dismissed. Contains a payload object with the unique id of the alert that was dismissed.