#!/usr/bin/env node
'use strict';

const fs = require('fs');
const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;
const os = require('os');
const path = require('path');

const EXACT_DEPENDENCIES = [
  `react@${process.env.REACT_VERSION}`,
  `react-dom@${process.env.REACT_DOM_VERSION}`
];
const EXACT_DEV_DEPENDENCIES = [
  `react-scripts@${process.env.REACT_SCRIPTS_VERSION}`
];
const DEPENDENCIES = [
  'rx',
  'is-promise',
  'mimic-fn',
  'external-editor',
  'js-base64'
];

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

const npmInstall = (packageName, extraArgs = []) => {
  console.log(`The npm dependencies for "${packageName}" are going to be installed.`);
  return executeCommand('npm', ['install'].concat(extraArgs), `Error while installing npm dependencies for "${packageName}"`);
};

const copyToApplicationDirectory = (src, dst, directoryName) => {
  console.log(`Copying ${src} (${directoryName}) to ${dst}.`);
  return executeCommand('cp', ['-R', src, dst], `Error while copying ${src} to ${dst}`);
};

const checkDependenciesInstallation = () => {
  try {
    fs.statSync(path.join(process.env.APPLICATION_ROOT, 'node_modules'));
    console.log('the node_modules directory is present. No need to install npm dependencies.');
    return Promise.resolve();
  } catch(err) {
    if(err.code == 'ENOENT') {
      return npmInstall('create-react-app exact dev depencies', ['--save-dev'].concat(EXACT_DEV_DEPENDENCIES))
        .then(npmInstall('create-react-app exact depencies', ['--save'].concat(EXACT_DEPENDENCIES)))
        .then(npmInstall('create-react-app depencies', ['--save'].concat(DEPENDENCIES)))
        .then(npmInstall('application'))
        .then(() => executeCommand('chmod', ['-R', '777',  path.join(process.env.APPLICATION_ROOT, 'node_modules')]))
        .then(() => {
          console.log('Dependencies installation done.');
        });
    }
  }
};

const checkDirectoryPresence = directoryName => {
  const dst = path.join(process.env.APPLICATION_ROOT, directoryName);
  try {
    fs.statSync(dst);
    console.log(`the "${directoryName}" directory is present. No need to copy it from the react-scripts module.`);
    return Promise.resolve();
  } catch(err) {
    const src = path.join(process.env.APPLICATION_ROOT, 'node_modules', 'react-scripts', 'template', directoryName);
    return copyToApplicationDirectory(src, dst, directoryName)
      .then(() => executeCommand('chmod', ['-R', '777', dst]));
  }
};

const checkCreateReactAppReadme = () => {
  const dst = path.join(process.env.APPLICATION_ROOT, 'create-react-app.md');
  try {
    fs.statSync(dstPath);
    console.log('the "create-react-app.md" directory is present. No need to copy it from the react-scripts module.');
    return Promise.resolve();
  } catch(err) {
    const src = path.join(process.env.APPLICATION_ROOT, 'node_modules', 'react-scripts', 'template', 'README.md');
    console.log(`Copying ${src} to ${dst}.`);
    return executeCommand('cp', [src, dst], `Error while copying ${src} to ${dst}`)
      .then(() => executeCommand('chmod', ['777', dst]));
  }
};

checkDependenciesInstallation()
  .then(() => checkDirectoryPresence('src'))
  .then(() => checkDirectoryPresence('public'))
  .then(checkCreateReactAppReadme)
  .catch(err => {
    console.error(err);
  });
