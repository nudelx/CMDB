const path = require('path');
const webpack = require('webpack'); //to access built-in plugins


module.exports = {
  entry: {
    'app': [
      'react-hot-loader/patch',
      './js/main.js'
    ]},
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, use: 'babel-loader',
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    // new HtmlWebpackPlugin()
  ]
};
