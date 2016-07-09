const {ipcRenderer} = require('electron');
const jspm = require('jspm');
const jspmConfig = require('jspm/lib/config.js');
const mainWindow = require('electron').remote.getGlobal('mainWindow');

exports.install = function(deps, jspmOptions) {
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

  return jspm.install(deps, jspmOptions);
};

exports.dlLoader = function (jspmOptions) {
  let jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);
  return jspm.checkDlLoader();
}

exports.getConfig = function (projectPath, packageJSONPath) {
  let originalWorkingDirectory = process.cwd();
  process.chdir(projectPath);
  jspm.setPackagePath(packageJSONPath);

  return jspmConfig.load()
  .then(() => {
    process.chdir(originalWorkingDirectory);
    return jspmConfig;
  }).catch((e) => {
    process.chdir(originalWorkingDirectory);

    throw e;
  });
}
