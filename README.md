# webpack-crash-course

Webpackの練習

## 内容メモ

- Webpackを用いない場合、HTMLロード時にCDN経由で様々なJS/CSSを取得する
  - コストが高い

## 手順まとめ

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
