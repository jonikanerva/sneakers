const R = require('ramda')
const CopyPlugin = require('copy-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const nodeExternals = require('webpack-node-externals')

const clientConfig = {
  name: 'client',
  entry: './src/client/browser.tsx',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: __dirname + '/build/public'
  },
  devtool: 'source-map',
  cache: true,
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: __dirname + '/postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true,
          cacheDirectory: __dirname + '/build/.awcache',
          reportFiles: ['src/**/*.{ts,tsx}']
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader'
      },
      {
        test: /\.ttf$/,
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new ManifestPlugin({
      fileName: __dirname + '/manifest.json'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[chunkhash].css'
    })
  ]
}

const serverConfig = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/server/server.ts',
  output: {
    filename: 'server.js',
    path: __dirname + '/build'
  },
  optimization: {
    nodeEnv: false
  },
  devtool: 'source-map',
  cache: true,
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          onlyLocals: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true,
          cacheDirectory: __dirname + '/build/.awcache',
          reportFiles: ['src/**/*.{ts,tsx}']
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader'
      }
    ]
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new CopyPlugin([{ from: 'public', to: 'public' }])
  ]
}

const workerConfig = R.mergeDeepRight(serverConfig, {
  name: 'worker',
  entry: './src/server/workers/fetchAndStore.ts',
  output: {
    filename: 'fetchAndStore.js',
    path: __dirname + '/build'
  }
})

module.exports = [clientConfig, serverConfig, workerConfig]
