// postcss config file

module.exports = {
  plugins: [
    require('autoprefixer'), //sets autoprefix
    require('css-mqpacker')({ //remove all extra media queries
      sort: require('sort-css-media-queries').desktopFirst // sort media by desktop first
    }),
    require('cssnano')({ //minimize css
      preset: [
        'default', {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
};
