'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NPM = exports.NPM = function () {
  function NPM() {
    _classCallCheck(this, NPM);

    this.isLoaded = false;
  }

  NPM.prototype.install = function install(packages, options) {
    var _this = this;

    var npm = System._nodeRequire('npm');
    var npmOptions = options.npmOptions || {};

    var originalWorkingDirectory = process.cwd();
    process.chdir(npmOptions.workingDirectory || process.cwd());
    this._log(options, 'chdir: ' + npmOptions.workingDirectory);

    return this.load(npm, npmOptions).then(function () {

      if (options.logCallback) {
        npm.registry.log.on('log', function (message) {
          options.logCallback(message);
        });
      }

      _this._log(options, "loaded");
      return new Promise(function (resolve, reject) {

        _this._log(options, "installing...");
        npm.commands.install(packages, function (error) {
          _this._log(options, "finished installing...", error);
          process.chdir(originalWorkingDirectory);

          if (error) reject(error);else resolve();
        });
      });
    }).catch(function (error) {
      process.chdir(originalWorkingDirectory);
      throw error;
    });
  };

  NPM.prototype.load = function load(npm, options, error) {
    return new Promise(function (resolve, reject) {
      npm.load(options, function (error) {
        if (error) reject(error);else {
          resolve();
        }
      });
    });
  };

  NPM.prototype._log = function _log(options, msg) {
    if (options.logCallback) {
      options.logCallback({ level: 'custom', message: msg });
    }
  };

  return NPM;
}();