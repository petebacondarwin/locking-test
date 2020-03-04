const cp = require('child_process');
const {writeFileSync} = require('fs');

const lockFilePath = './lock.txt';

module.exports.createLocker = function() {
  let unlocker = cp.fork('./unlocker.js', [lockFilePath], { detached: true});
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
    writeFileSync(lockFilePath, process.pid, {encoding: 'utf8', flag: 'wx'});
    console.log('locked');
  }

  function unlock() {
    if (unlocker !== null) {
      unlocker.disconnect();
      unlocker = null;
    }
  }
};
