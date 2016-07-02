var path = require('path');
var paths = require('./paths');

exports.base = function() {
  var config = {
    filename: '',
    filenameRelative: '',
    sourceMap: true,
    sourceRoot: '',
    moduleRoot: path.resolve('src').replace(/\\/g, '/'),
    moduleIds: false,
    comments: false,
    compact: false,
    code: true,
    presets: [ 'es2015-loose', 'stage-1' ],
    plugins: [
      'syntax-flow',
      'transform-decorators-legacy',
      'transform-flow-strip-types',
      'transform-async-to-generator'
    ]
  };
  return config;
}

exports.commonjs = function() {
  var options = exports.base();
  options.plugins.push('transform-es2015-modules-commonjs');
  return options;
};

exports.amd = function() {
  var options = exports.base();
  options.plugins.push('transform-es2015-modules-amd');
  return options;
};
