let child_process = System._nodeRequire('child_process');

export class Processes {
  execChildProcess (cmd, options = undefined, callback = undefined) {
    return child_process.exec(cmd, options, callback);
  }
}
