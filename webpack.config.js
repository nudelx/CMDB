const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  entry: {
    'app': [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './js/main.js'
    ]},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath:'/'
  },
  devServer: {
    hot: true,
    inline: true,
     contentBase: path.resolve(__dirname, 'dist'),
     publicPath:'/'
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
    // new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({ template: 'dist/t.html'})
  ]
};
