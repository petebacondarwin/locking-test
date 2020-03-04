const fs = require('fs');

console.log('ARGS', process.argv);
const lockFilePath = process.argv.pop();

const ppid = '' + process.ppid;
log(`unlocker started: ${process.pid}, ${process.ppid}, ${process.connected}`);

process.on('disconnect', () => {
  log('parent exited');
  unlock();
});

function unlock() {
  try {
    const lockFile = fs.readFileSync(lockFilePath, 'utf8');
    log(`lockFile process: ${lockFile}, parent process: ${ppid}`);
    if (lockFile === ppid) {
      fs.unlinkSync(lockFilePath);
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
