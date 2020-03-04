const fs = require('fs');

const ppid = '' + process.ppid;
log(`unlocker started: ${process.pid}, ${process.ppid}, ${process.connected}`);

process.on('disconnect', () => {
  log('parent exited');
  unlock();
});

function unlock() {
  try {
    const lockFile = fs.readFileSync('./lock.txt', 'utf8');
    log(`lockFile process: ${lockFile}, parent process: ${ppid}`);
    if (lockFile === ppid) {
      fs.unlinkSync('./lock.txt');
      log('unlocked');
    }
  } catch {
    log('No lock file to unlock');
    // Quietly exit
  }
}

function log(message) {
  console.log('\n--- ' + message);
  fs.writeFileSync('./log.txt', message + '\n', {flag: 'a'});
}
