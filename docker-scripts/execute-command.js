'use strict';

const spawn = require('child_process').spawn;

const executeCommand = (command, args, errorMsg) => {
  return new Promise((resolve, reject) => {
    const stream = spawn(command, args);
    stream.stderr.pipe(process.stderr, { end: false });
    stream.on('close', code => {
      if(code !== 0) {
        reject(new Error(errorMsg));
      } else {
        resolve();
      }
    });
  });
};

module.exports = executeCommand;
