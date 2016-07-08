const requireTaskPool = System._nodeRequire('electron-remote').requireTaskPool;
const jspmTaskPath = System._nodeRequire.resolve(__dirname + '/jspm_commands.js');
const ipcRenderer = System._nodeRequire('electron').ipcRenderer;
import {createGUID} from './guid';

export class JSPM {
  install (packages, options) {
    let jspmOptions = options.jspmOptions || {};
    let jspmModule = requireTaskPool(jspmTaskPath);

    //add guid we will use for messaging between window && add listener for the guid
    jspmOptions.guid = createGUID();
    ipcRenderer.on(jspmOptions.guid, (event, msg) => {
      this._log(options,msg);
    });

    this._log(options, 'installing...');
    return jspmModule.install(jspmOptions).then(()=> {
      ipcRenderer.removeAllListeners(jspmOptions.guid);
      this._log(options, 'finished installing jspm packages');
    }).catch(error => {
      ipcRenderer.removeAllListeners(jspmOptions.guid);
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
