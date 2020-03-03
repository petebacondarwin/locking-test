const cp = require('child_process');
const {writeFileSync} = require('fs');

module.exports.createLocker = function() {
  let unlocker = cp.fork('./unlocker.js', undefined, { detached: true});
  process.on('exit', unlock);

  return {
    locked(fn) {
      if (unlocker === null) {
        throw new Error('Cannot lock twice. Create a new locker.')
      }
      lock();
      try {
        fn();
      } finally {
        unlock();
      }
    }
  };

  function lock() {
    writeFileSync('./lock.txt', process.pid, {encoding: 'utf8', flag: 'wx'});
    console.log('locked');
  }

  function unlock() {
    if (unlocker !== null) {
      unlocker.disconnect();
      unlocker = null;
    }
  }
};
