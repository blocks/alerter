var browserify   = require('browserify');
var bundleLogger = require('./util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('./util/handleErrors');
var source       = require('vinyl-source-stream');
var derequire    = require('gulp-derequire');

var hbsfy = require('hbsfy').configure({
  extensions: ['hbs']
});

gulp.task('browserify', function() {
  var bundler = browserify({
    entries: ['./src/alerter.js'],
    standalone: 'Alerter'
  });

  var bundle = function() {
    bundleLogger.start();

    return bundler
      .transform(hbsfy)
      .bundle()
      .on('error', handleErrors)
      .pipe(source('alerter.js'))
      .pipe(derequire())
      .pipe(gulp.dest('./build/'))
      .on('end', bundleLogger.end);
  };

  return bundle();
});