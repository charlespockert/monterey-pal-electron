'use strict';

var _require = require('electron');

var ipcRenderer = _require.ipcRenderer;

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