#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const executeCommand = require('./execute-command');

const checkDependenciesInstallation = () => {
  const nodeModuleDirectory = path.join(process.env.APPLICATION_ROOT, 'node_modules');
  try {
    fs.statSync(nodeModuleDirectory);
    console.log(`the ${nodeModuleDirectory} directory is present. No need to install npm dependencies.`);
    return Promise.resolve();
  } catch(err) {
    if(err.code == 'ENOENT') {
      return Promise.resolve()
        .then(() => executeCommand('mkdir', [nodeModuleDirectory]))
        .then(() => executeCommand('chmod', ['-R', '777',  nodeModuleDirectory]))
        .then(() => executeCommand('npm', ['install'], 'Error while installing npm dependencies'))
        .then(() => console.log('Dependencies installation done.'));
    }
  }
};

const checkConfDirectory = () => {
  const confDirectory = path.join(process.env.APPLICATION_ROOT, 'conf');
  try {
    fs.statSync(confDirectory);
    console.log(`the "${confDirectory}" directory is present. No need to create it.`);
    return Promise.resolve();
  } catch(err) {
    console.log(`Creating the "${confDirectory}" directory.`);
    return executeCommand('mkdir', [confDirectory], `Error while creating the "${confDirectory}" directory`)
      .then(() => executeCommand('chmod', ['777', confDirectory]));
  }
};

Promise.resolve()
  .then(checkDependenciesInstallation)
  .then(checkConfDirectory)
  .catch(console.error);
