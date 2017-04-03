const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
// const webpack = require('webpack'); //to access built-in plugins



module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'bundle.js'
  },
  // module: {
  //   rules: [
  //     {test: /\.(js|jsx)$/, use: 'babel-loader'}
  //   ]
  // },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    // new HtmlWebpackPlugin()
  ]
};
