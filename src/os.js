const os = System._nodeRequire('os');
const shell = System._nodeRequire('electron').shell;

export class OS {
  getPlatform() {
    return os.platform();
  }

  openItem(path) {
    shell.openItem(path);
  }
}