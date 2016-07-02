'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var child_process = System._nodeRequire('child_process');

var Processes = exports.Processes = function () {
  function Processes() {
    _classCallCheck(this, Processes);
  }

  Processes.prototype.execChildProcess = function execChildProcess(cmd) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
    var callback = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

    return child_process.exec(cmd, options, callback);
  };

  return Processes;
}();