const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildWebpackConfig = merge(baseWebpackConfig, { // BUILD config
  mode: 'production',
  plugins: [
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: {
        optimizationLevel: 3
      },
      jpegtran: {
        progressive: true
      }
    })
  ],
  output: {
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true
            }
          },{
            loader: 'css-loader',
            options: { sourceMap: true }
          },{
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: `./postcss.config.js` } }
          },{
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: `[name].[ext]`,
          outputPath: './assets/fonts',
          publicPath: '../fonts'
        }
      },
    ]
  }
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
});
