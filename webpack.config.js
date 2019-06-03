const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// resolve: 絶対パスの生成
const outputPath = path.resolve(__dirname, 'dist')
//console.log({ outputPath });

module.exports = {
  // Webpackのエントリポイント（バンドル対象）
  entry: './src/index.js',
  // 出力情報
  output: {
    filename: 'main.js', // 出力ファイル名
    path: outputPath // 絶対パスである必要がある
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // .js or .jsxを対象とする
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        // use: ['css-loader', 'style-loader'] // Webpackは逆順にLoaderを適用するため、左記設定では動かない
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  // webpack-dev-serverの設定
  devServer: {
    contentBase: outputPath // rootの位置をdistに変更
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  devtool: 'eval-source-map'
}
