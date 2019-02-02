const path = require('path');

const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const info = require('./package.json');

const pathResolve = p => path.resolve(__dirname, p);

const DIST_FOLDER_NAME = 'dist';
const DIST_FOLDER_PATH = pathResolve(DIST_FOLDER_NAME);

module.exports = {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
      port: 8080,
      contentBase: DIST_FOLDER_PATH,
      historyApiFallback: true,
      clientLogLevel: 'warning',
      overlay: true,
      hot: true,
      hotOnly: true,
      inline: true,
      open: false,
   },

   entry: pathResolve('index.js'),

   output: {
      path: DIST_FOLDER_PATH,
      filename: '[name].js',
   },

   performance: {
      hints: false,
   },

   resolve: {
      extensions: ['.js', '.vue'],
   },

   resolveLoader: {
      modules: [pathResolve('node_modules'), pathResolve('..')],
   },

   module: {
      rules: [
         {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
               loaders: {
                  js: 'babel-loader',
                  html: 'bem-template-loader',
               },
            },
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.styl(us)?$/,
            use: ['style-loader', 'css-loader', 'stylus-loader'],
         },
         {
            test: /\.(png|jpg|gif|svg)$/i,
            loader: 'url-loader',
            options: { limit: 8192 },
         },
         {
            test: /\.(png|jpg|gif|svg)$/i,
            loader: 'file-loader',
            options: { name: '[name].[ext]?[hash]' },
         },
      ],
   },

   plugins: [
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(['dist'], { root: pathResolve('.'), verbose: true }),
      new HtmlWebpackPlugin({ template: pathResolve('index.html') }),
      new webpack.HotModuleReplacementPlugin(),
   ],
};
