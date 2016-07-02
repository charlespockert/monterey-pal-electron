import {initializePAL} from 'monterey-pal';
import {AureliaCLI}    from './aurelia-cli';
import {Fs}            from './fs';
import {Session}       from './session';
import {Processes}     from './processes';

export function initialize() {
  let _fs = new Fs();
  let _aureliaCLI = new AureliaCLI();
  let _session = new Session();
  let _processes = new Processes();

  initializePAL((fs, session, aureliaCLI, processes) => {
    Object.assign(fs, _fs);
    Object.assign(fs, _fs.constructor.prototype);
    Object.assign(aureliaCLI, _aureliaCLI);
    Object.assign(aureliaCLI, _aureliaCLI.constructor.prototype);
    Object.assign(session, _session)
    Object.assign(session, _session.constructor.prototype);
    Object.assign(processes, _processes)
    Object.assign(processes, _processes.constructor.prototype);
  });
}
