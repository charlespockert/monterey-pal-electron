'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var requireTaskPool = System._nodeRequire('electron-remote').requireTaskPool;
var jspmTaskPath = System._nodeRequire.resolve(__dirname + '/jspm_commands.js');

var JSPM = exports.JSPM = function () {
  function JSPM() {
    _classCallCheck(this, JSPM);
  }

  JSPM.prototype.install = function install(packages, options) {
    var _this = this;

    var jspmOptions = options.jspmOptions || {};
    var jspmModule = requireTaskPool(jspmTaskPath);

    this._log(options, 'installing...');
    return jspmModule.install(jspmOptions).then(function () {
      _this._log(options, 'finished installing jspm packages');
    }).catch(function (error) {
      _this._log(options, 'error while installing jspm packages, ' + error.message);
      throw error;
    });
  };

  JSPM.prototype.downloadLoader = function downloadLoader(options) {
    var _this2 = this;

    var jspmOptions = options.jspmOptions || {};
    var jspmModule = requireTaskPool(jspmTaskPath);

    this._log(options, 'downloading systemjs loader...');
    return jspmModule.dlLoader(jspmOptions).then(function () {
      _this2._log(options, 'downloaded systemjs loader');
    }).catch(function (err) {
      _this2._log(options, 'error while downloading systemjs loader, ' + error.message);
      throw err;
    });
  };

  JSPM.prototype._log = function _log(options, msg) {
    if (options.logCallback) {
      options.logCallback({ level: 'custom', message: msg });
    }
  };

  return JSPM;
}();