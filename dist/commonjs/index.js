'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;

var _montereyPal = require('monterey-pal');

var _aureliaCli = require('./aurelia-cli');

var _fs2 = require('./fs');

var _session2 = require('./session');

var _processes2 = require('./processes');

function initialize() {
  var _fs = new _fs2.Fs();
  var _aureliaCLI = new _aureliaCli.AureliaCLI();
  var _session = new _session2.Session();
  var _processes = new _processes2.Processes();

  (0, _montereyPal.initializePAL)(function (fs, session, aureliaCLI, processes) {
    Object.assign(fs, _fs);
    Object.assign(fs, _fs.constructor.prototype);
    Object.assign(aureliaCLI, _aureliaCLI);
    Object.assign(aureliaCLI, _aureliaCLI.constructor.prototype);
    Object.assign(session, _session);
    Object.assign(session, _session.constructor.prototype);
    Object.assign(processes, _processes);
    Object.assign(processes, _processes.constructor.prototype);
  });
}