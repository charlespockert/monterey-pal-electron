exports.install = function(jspmOptions) {
  let jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);

  jspm.on('log', (type, msg) => {
    if (type === 'err') {
      throw new Error(msg);
    }
  });

  return jspm.install(true, jspmOptions);
};

exports.dlLoader = function (jspmOptions) {
  let jspm = require('jspm');
  jspm.setPackagePath(jspmOptions.workingDirectory);
  return jspm.dlLoader(null, true);
}
