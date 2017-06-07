#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const executeCommand = require('/docker-scripts/execute-command');

const writeFile = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, err => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const marvel = {
  filePath: path.join(process.env.APPLICATION_ROOT, 'conf', 'marvel.json'),
  check: () => {
    try {
      fs.statSync(marvel.filePath);
      console.log(`the ${marvel.filePath} file is present. No need to create it.`);
      return Promise.resolve();
    } catch(err) {
      return marvel.create();
    }
  },
  create: () => {
    console.log(`Creating the "${marvel.filePath}" file.`);
    const marvelConfig = {
      ts: process.env.MARVEL_TS,
      apikey: process.env.MARVEL_API_KEY,
      hash: process.env.MARVEL_HASH
    };
    return writeFile(marvel.filePath, JSON.stringify(marvelConfig))
  }
};


Promise.resolve()
  .then(marvel.check)
  .catch(console.error);
