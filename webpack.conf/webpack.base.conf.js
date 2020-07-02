const path = require('path');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const { VueLoaderPlugin } = require('vue-loader');
// const SvgStore = require('webpack-svgstore-plugin');

// Main const
const PATH = {
  src: path.join(__dirname, '../resources'),
  dist: path.join(__dirname, '../public/build'),
};

const PAGES_DIR = fs.existsSync(`${PATH.src}/pug/pages/`) ? `${PATH.src}/pug/pages/` : null;
const PAGES = PAGES_DIR ? fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug')) : null;

module.exports =  {
  context: path.join(__dirname, '../resources'),
  entry: {
    'app': `./js/app.js`,
  },
  stats: {
    children: false,
    hash: false,
    version: false,
    errorDetails: false,
    entrypoints: false,
    performance: false,
    chunks: false,
    modules: false,
    reasons: false,
    source: false,
    builtAt: false,
  },
  output: {
    filename: `js/[name].js`,
    path: PATH.dist,
    publicPath: process.env.WEBPACK_DEV_SERVER ? '/' : './',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    },
  },
  module: {
    rules: [{
      test: /\.pug$/,
      loader: 'pug-loader',
      query: {
        pretty: true
      }
    },{
      test: /\.js$/,
      exclude: '/node_modules/',
      loader: 'babel-loader'
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    }]
  },
  resolve: {
    alias: {
      '~': PATH.src,
    }
  },
  plugins: [
    // new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/[name].css`,
    }),
    new CopyPlugin({
      patterns: [
        {from: `./assets/img`, to: 'img'},
        {from: `./assets/fonts`, to: 'fonts'},
        {from: `./static`, to: ''},
      ],
    }),
    // new SvgStore({
    //   // svgo options\
    //   svgoOptions: {
    //     plugins: [
    //       { removeTitle: true },
    //       // { removeViewBox: true },
    //       // { removeAttrs: {
    //       //     attrs: '*:(stroke|fill):((?!^none$).)*'
    //       //   }
    //       // }
    //     ]
    //   },
    //   prefix: ''
    // }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [PATH.dist],
    }),
    new ManifestPlugin({
      fileName: '../mix-manifest.json',
      map: (FileDescriptor) => {
        FileDescriptor.name = `/build/${FileDescriptor.name}`;
        return FileDescriptor;
      },
    }),
  ]
    .concat(fs.existsSync('./.env') ? [new Dotenv()] : [])
    .concat(PAGES_DIR ?
      [...PAGES.map(page => new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/${page}`,
        filename: `./${page.replace(/\.pug/,'.html')}`,
        hash: true,
        cache: false,
      }))]
  : []),
};
