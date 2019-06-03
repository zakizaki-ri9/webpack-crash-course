# webpack-crash-course

- コース: https://www.udemy.com/webpack-crash-course/
- Webpackの練習

## 内容メモ

- Webpackを用いない場合、HTMLロード時にCDN経由で様々なJS/CSSを取得する
  - コストが高い
  - 全てをバンドル（まとめた）状態のファイルを作っておくのがWebpack
- `package.json`の`scripts`
  - `npm`や`yarn`といったコマンドを登録しておける
  - `start`にまとめたコマンドは`npm start`や`yarn start`で実行することができる
- Loader
  - 様々な要素（CSSや画像など）をjsにバンドルしてくれる仕組み
  - [Loader Features](https://webpack.js.org/concepts/loaders#loader-features)
    - `in reverse order`という記述がある。
    - `webpack.config.js`に記載したLoaderは逆順に適用される。
    - 記述する順番に注意する。
  - [file-loader](https://github.com/webpack-contrib/file-loader)
    - 全てjsファイルにバンドルすると重たくなってくる
    - ファイルとして出力、imageタグ等の適切なタグに置き換えてくれる
- Babel
  - https://babeljs.io/
    - どのブラウザでも見れるようトランスパイルしてくれる
    - 導入したい言語や環境ごとのSetup手順が見れる

## 手順まとめ

### Webpackを用いない場合

```bash
# package.jsonの生成 -yはyesスキップ
yarn init -y

# 各パッケージのバージョン確認
# yarn info パッケージ名
yarn info webpack

# webpackの導入（必要なら@つけてバージョン指定する）
#  -Dは開発環境にのみインストールするという意味合い
yarn add -D webpack webpack-cli

# live-serverの導入
yarn add -D live-server

# ローカル環境での実行
yarn run live-server
```

### Webpackの適用

```bash
# lodashをインストール
yarn add lodash

# Webpackを使って参照するファイルをバンドル -> main.jsへ出力される
yarn run webpack
```

### webpack-dev-server

```bash
# webpack-dev-serverの導入
yarn add -D webpack-dev-server

# 起動 ＆ ブラウザ表示
yarn run webpack-dev-server --open
```

### Babel - Webpack x Reactを用いる場合

```bash
# Reactの導入
yarn add -D react react-dom

# babelの導入
yarn add -D babel-loader @babel/core

# ES2015以降のシンタックスに対応するために導入
yarn add -D @babel/preset-env

# Reactの対応
yarn add -D @babel/preset-react
```

**webpack.config.js**
```js
module: {
  rules: [
    {
      test: /\.jsx?$/, // .js or .jsxを対象とする
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
  ]
}
```

**.babelrc.js**
presetの有効化
```js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react']
}
```

#### 参考URL

- https://babeljs.io/setup#installation
- https://babeljs.io/docs/en/babel-preset-react

### ソースマップ

色々バンドルするとエラーの追跡・解析が難しくなる。  
その解決方法として、ソースマップを用いる。

- [Webpack - Devtool](https://webpack.js.org/configuration/devtool/)
- [WebpackのDevtoolについての解説](https://dackdive.hateblo.jp/entry/2016/04/13/123000#devtool)

以下設定例。指定する値によってWebDevtool常に表示されるソースが元に近い状態であるか、  
また、ビルド速度に違いが発生する。

**webpack.config.js**
```js
{
  devtool: 'eval-source-map'
}
```

# その他

## `lint-staged` x `husky`で`git commit`時にeslintのチェックをかける

- 参考記事
  - [Qiita - コミット前に Lint を強制するなら lint-staged が便利](https://qiita.com/ybiquitous/items/553479cfcb2cee124ae0)
  - [Qiita - npmモジュール`pre-commit`を利用してチーム全体で低品質なコードをコミットできないようにする](https://qiita.com/potato4d/items/5dfebb9da1c5fe400809)
- lint-staged: https://github.com/okonet/lint-staged
- husky: https://github.com/typicode/husky

### 概要

GitのHook機能（今回はCommit）を利用し、コミット時に様々なフォーマットやlintによるチェックを行い、
チーム開発等で決められている（eslintなどの）ルールに反したコードのCommit ／ Pushを防ぐことができる。

### 手順

```bash
# 必要なプラグインの導入
yarn add -D eslint lint-staged husky
```

`package.json`の設定を行う。

- **"husky"**は以下ドキュメントに記載している通りに記載。
  - https://github.com/okonet/lint-staged#examples
- **"lint-staged"**にはコミット前に走らせたいコマンドと`git add`を記載する。
  - `*.js`ファイルにeslintのチェックをかけたい場合は以下のドキュメントのように記載する。
    - https://github.com/okonet/lint-staged#automatically-fix-code-style-with---fix-and-add-to-commit
- **"ignore"**には対象外のディレクトリやファイルを指定する。

以下、参考。

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "linters": {
      "*.js": [
        "eslint --fix",
        "git add"
      ]
    },
    "ignore": [
      "dist/**/*"
    ]
  }
}
```

おわり。
