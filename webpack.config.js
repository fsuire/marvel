var path = require('path');
var webpack = require('webpack');

var javascriptEntryPath = path.resolve(__dirname, 'src', 'index.js');
var htmlEntryPath = path.resolve(__dirname, 'public', 'index.html');
var buildPath = path.resolve(__dirname, 'public', 'build');

module.exports = {
  context: __dirname,
  entry: [
    'webpack-hot-middleware/?path=/__webpack_hmr&timeout=20000',
    javascriptEntryPath,
    htmlEntryPath
  ],
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: '#source-map',
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      // loaders: ['react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2017']
      loaders: ['babel-loader?presets[]=react,presets[]=es2017']
    }, {
      test: /\.html$/,
      loader: 'file-loader?name=[name].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    }, {
      test: /\.svg$/,
      loader: 'svg-url-loader'
    }],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
