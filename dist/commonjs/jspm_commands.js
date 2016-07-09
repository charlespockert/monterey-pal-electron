'use strict';

var _require = require('electron');

var ipcRenderer = _require.ipcRenderer;

var jspm = require('jspm');
var jspmConfig = require('jspm/lib/config.js');
var mainWindow = require('electron').remote.getGlobal('mainWindow');

exports.install = function (jspmOptions) {
  var jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);

  jspm.on('log', function (type, msg) {
    if (type === 'err') {
      throw new Error(msg);
    } else {
      mainWindow.webContents.send(jspmOptions.guid, msg);
    }
  });

  return jspm.install(true, jspmOptions);
};

exports.dlLoader = function (jspmOptions) {
  var jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);
  return jspm.dlLoader(null, true);
};

exports.getConfig = function (projectPath, packageJSONPath) {
  var originalWorkingDirectory = process.cwd();
  process.chdir(projectPath);
  jspm.setPackagePath(packageJSONPath);

  return jspmConfig.load().then(function () {
    process.chdir(originalWorkingDirectory);
    return jspmConfig;
  }).catch(function (e) {
    process.chdir(originalWorkingDirectory);

    throw e;
  });
};