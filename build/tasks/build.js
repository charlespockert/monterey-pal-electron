var gulp = require('gulp');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var compilerTsOptions = require('../typescript-options');
var assign = Object.assign || require('object.assign');
var through2 = require('through2');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var rename = require('gulp-rename');
var tools = require('aurelia-tools');
var ts = require('gulp-typescript');
var gutil = require('gulp-util');
var gulpIgnore = require('gulp-ignore');
var merge = require('merge2');
var jsName = paths.packageName + '.js';
var compileToModules = ['commonjs'];

compileToModules.forEach(function(moduleType){
  gulp.task('build-babel-' + moduleType, function () {
    return gulp.src(paths.source)
      .pipe(to5(assign({}, compilerOptions[moduleType]())))
      .pipe(gulp.dest(paths.output + moduleType));
  });
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    compileToModules
      .map(function(moduleType) { return 'build-babel-' + moduleType }),
    callback
  );
});
