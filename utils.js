module.exports = {
  bigCompute(i) {
    for(let j = 0; j < 10000; j++) {
      i = ('' + i).toUpperCase();
    }
  },

  printProgress(progress){
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write('' + progress);
  },
};
