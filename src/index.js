import {initializePAL} from 'monterey-pal';
import {AureliaCLI}    from './aurelia-cli';
import {Fs}            from './fs';
import {Session}       from './session';

export function initialize() {
  let _fs = new Fs();
  let _aureliaCLI = new AureliaCLI();
  let _session = new Session();

  initializePAL((fs, session, aureliaCLI) => {
    Object.assign(fs, _fs);
    Object.assign(fs, _fs.constructor.prototype);
    Object.assign(aureliaCLI, _aureliaCLI);
    Object.assign(aureliaCLI, _aureliaCLI.constructor.prototype);
    Object.assign(session, _session)
    Object.assign(session, _session.constructor.prototype);
  });
}
