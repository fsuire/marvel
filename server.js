'use strict';

const path = require('path');

const express = require('express');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

if (isDeveloping) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    quiet: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    stats: {
      colors: true,
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler, {log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000}));
  app.use(express.static('public'));
} else {
  const staticPath = path.join(__dirname, 'public/build')
  app.use(express.static(staticPath));
}

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.log(`🌎  Listening on port ${port}`);
});
