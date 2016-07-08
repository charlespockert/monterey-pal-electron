const {ipcRenderer} = require('electron');
const mainWindow = require('electron').remote.getGlobal('mainWindow');

exports.install = function(jspmOptions) {
  let jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);

  jspm.on('log', (type, msg) => {
    if (type === 'err') {
      throw new Error(msg);
    } else {
      //we send to the guid only, so we know where it ends up, this way we have no global listeners
      mainWindow.webContents.send(jspmOptions.guid, msg);
    }
  });

  return jspm.install(true, jspmOptions);
};

exports.dlLoader = function (jspmOptions) {
  let jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);
  return jspm.dlLoader(null, true);
}
