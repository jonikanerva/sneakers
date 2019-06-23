const R = require('ramda')
const CopyPlugin = require('copy-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const clientConfig = {
  name: 'client',
  entry: './src/client/browser.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build/public'
  },
  devtool: 'source-map',
  cache: true,
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          reportFiles: ['src/client/**/*.{ts,tsx}']
        }
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  plugins: [new HardSourceWebpackPlugin()]
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
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
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

console.log('workder', workerConfig)
module.exports = [clientConfig, serverConfig, workerConfig]
