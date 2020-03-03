const {closeSync, openSync, writeSync} = require('fs');

module.exports.createLocker = function() {
  let fd = null;
  return {
    locked(fn) {
      lock();
      try {
        fn();
      } finally {
        unlock();
      }
    }
  };

  function lock() {
    fd = openSync('./lock.txt', 'r+');
    console.log(process.pid);
    const buffer = Buffer.from('' + process.pid, 'utf8');
    writeSync(fd, buffer);
    console.log('locked');
  }

  function unlock() {
    if (fd !== null) {
      closeSync(fd);
      fd = null;
    }
  }
};
