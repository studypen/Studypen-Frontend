/* disable-eslint */
const path = require("path");
const BundleTracker = require('webpack-bundle-tracker');
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");


const babelCommonPlugins = [
  // [
  //   "module-resolver",
  //   {
  //     "alias": {
  //       "@components": "./src/components",
  //       "@data": "./src/data",
  //       "@pages": "./src/pages",
  //       "@hooks": "./src/hooks",
  //       "@utils": "./src/utils",
  //     }
  //   }
  // ],
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-transform-runtime"
]





const common = {
  target: 'web',
  optimization: { splitChunks: { chunks: 'all' } },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: path.resolve(__dirname, "build", "index.html"),
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new BundleTracker({
      path: __dirname,
      filename: 'webpack-stats.json'
    }),
  ],
}
const production = merge(common, {
  entry: './src/index.tsx',
  mode: 'production',
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'build'),
    filename: "js/[name].[chunkhash:8].js",
    chunkFilename: 'js/[name].chunk.js'
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'css/[name].[chunkhash:8].css'
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, 'build') },
    ]
  }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            ["@babel/preset-env", { "modules": false }],
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          plugins: [...babelCommonPlugins],
          cacheDirectory: true,
        }
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      }],
  }
})
const development = merge(common, {
  devtool: 'inline-source-map',
  entry: ['react-hot-loader/patch', "./src"],

  mode: "development",

  output: {
    // publicPath: 'http://192.168.43.165:9000/static/',
    // publicPath: 'static/',
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].js",
    chunkFilename: "js/[name].chunk.js",
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public'),
    contentBasePublicPath: '/',
    port: 9000,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            ["@babel/preset-env", { "modules": false }],
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          plugins: [
            ...babelCommonPlugins,
            "react-hot-loader/babel"
          ],
          cacheDirectory: true,
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          "css-loader",
          "sass-loader",
        ],
      }
    ],
  },
})


module.exports = (env, argv) => argv.mode == 'production' ? production : development;