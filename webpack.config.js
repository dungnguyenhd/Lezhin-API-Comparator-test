const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './components/index.html'),
  filename: './index.html',
});
module.exports = {
  entry:
    path.join(__dirname, './components/index.js'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [htmlWebpackPlugin, new Dotenv()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals:
    [],
  devServer: {
    port: 8000,
  },
};
