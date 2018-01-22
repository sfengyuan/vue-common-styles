const path = require('path')
const webpack = require('webpack')
const ExtractText = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
let src = path.join(__dirname, 'src')
let dist = path.join(__dirname, './dist')
let isProduction = process.env.NODE_ENV === 'production'

let entry = isProduction
  ? path.join(__dirname, 'src/index.js')
  : path.join(__dirname, 'entry.js')
let config = {
  entry: entry,
  output: {
    path: dist,
    filename: 'vcstyles.min.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': src
    }
  },
  devServer: {
    noInfo: true,
    publicPath: '/',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'untitled',
      template: 'index.html'
    })
  ]
}

let devConfig = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
  ],
  devtool: 'cheap-module-eval-source-map'
}
let proConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractText.extract({
          use: ['css-loader', 'postcss-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.styl$/,
        use: ExtractText.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'postcss-loader',
            'stylus-loader'
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      test: /\.js$/,
      exclude: [/\.min\.js$/gi],
      uglifyOptions: {
        warnings: false,
        compress: {
          drop_console: false,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    }),
    new ExtractText('css/[name].css'),
    new OptimizeCssAssetsPlugin({
      safe: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
}

if (isProduction) {
  config.module.rules = config.module.rules.concat(proConfig.module.rules)
  config.output.library = 'vnotify'
  config.output.libraryTarget = 'commonjs2'
  config.externals = ['vue']
  config.plugins = config.plugins.concat(proConfig.plugins)
  config.performance = { // performance budget 默认是250kb
    hints: 'warning', // 'error' or false are valid too
    maxEntrypointSize: 40000, // in bytes
    maxAssetSize: 450000 // in bytes
  }
  // config.devtool = '#source-map'
} else {
  config.module.rules = config.module.rules.concat(devConfig.module.rules)
  config.plugins = config.plugins.concat(devConfig.plugins)
}

module.exports = config
