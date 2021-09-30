const PreactRefreshPlugin = require('@prefresh/webpack');
const cssnano = require('cssnano');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/client/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { configFile: path.join(__dirname, 'tsconfig.client.json') },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-icss-values', cssnano()],
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: isProduction ? 'client.html' : 'index.html',
      inject: 'body',
      template: path.join(__dirname, 'src/client/client.ejs'),
      templateParameters: {
        buildStats: isProduction
          ? 'DATA_PLACEHOLDER'
          : JSON.stringify(
              require('./src/client/__fixtures__/build-stats.json')
            ),
        title: isProduction ? 'TITLE_PLACEHOLDER' : 'Bundle',
      },
    }),
    isProduction && new HtmlInlineScriptPlugin(),
    !isProduction && new PreactRefreshPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    filename: 'client.js',
    path: path.join(__dirname, 'dist/client'),
    publicPath: '/',
  },
};
