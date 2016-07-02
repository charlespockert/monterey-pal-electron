'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var remote = System._nodeRequire('electron').remote;

var Session = exports.Session = function () {
  function Session() {
    _classCallCheck(this, Session);

    this.url = 'http://aureliatools.com';

    this.mainWindow = remote.getGlobal('mainWindow');
    this.session = this.mainWindow.webContents.session;
  }

  Session.prototype.get = function get(key) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      return _this.session.cookies.get({ name: key, url: _this.url }, function (error, cookies) {
        if (error) reject(error);

        if (cookies.length > 0) {
          resolve(cookies[0].value);
        } else {
          resolve(undefined);
        }
      });
    });
  };

  Session.prototype.set = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(key, value) {
      var _this2 = this;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', new Promise(function (resolve, reject) {
                return _this2.session.cookies.set({ name: key, value: value, url: _this2.url }, function (error) {
                  if (error) reject(error);
                  resolve();
                });
              }));

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function set(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return set;
  }();

  Session.prototype.clear = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var _this3 = this;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', new Promise(function (resolve) {
                _this3.session.clearCache(function () {
                  return resolve();
                });
              }));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function clear() {
      return _ref2.apply(this, arguments);
    }

    return clear;
  }();

  return Session;
}();