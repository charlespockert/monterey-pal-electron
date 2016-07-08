'use strict';

exports.install = function (jspmOptions) {
  var jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);

  jspm.on('log', function (type, msg) {
    if (type === 'err') {
      throw new Error(msg);
    }
  });

  return jspm.install(true, jspmOptions);
};

exports.dlLoader = function (jspmOptions) {
  var jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);
  return jspm.dlLoader(null, true);
};