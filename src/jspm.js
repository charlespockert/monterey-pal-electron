const requireTaskPool = System._nodeRequire('electron-remote').requireTaskPool;
const jspmTaskPath = System._nodeRequire.resolve(__dirname + '/jspm_commands.js');

export class JSPM {
  install (packages, options) {
    let jspmOptions = options.jspmOptions || {};
    let jspmModule = requireTaskPool(jspmTaskPath);

    this._log(options, 'installing...');
    return jspmModule.install(jspmOptions).then(()=> {
      this._log(options, 'finished installing jspm packages');
    }).catch(error => {
      this._log(options, `error while installing jspm packages, ${error.message}`);
      throw error;
    });
  }

  downloadLoader(options) {
    let jspmOptions = options.jspmOptions || {};
    let jspmModule = requireTaskPool(jspmTaskPath);

    this._log(options, 'downloading systemjs loader...');
    return jspmModule.dlLoader(jspmOptions)
    .then(() => {
      this._log(options, `downloaded systemjs loader`);
    }).catch(err => {
      this._log(options, `error while downloading systemjs loader, ${error.message}`);
      throw err;
    });
  }

  _log(options, msg) {
    if (options.logCallback) {
      options.logCallback({level: 'custom', message: msg });
    }
  }
}
