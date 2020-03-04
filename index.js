const {createLocker} = require('./locker');
const {bigCompute, printProgress} = require('./utils');

const locker = createLocker();

for(let i = 0; i<100; i++) {
  printProgress(i);
  bigCompute(i);
}

console.log('starting run');

locker.locked(() => {
  for(let i = 0; i<10000; i++) {
    printProgress(i);
    bigCompute(i);
  }
});
