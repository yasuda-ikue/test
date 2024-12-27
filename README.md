# ASTRO SAMPLE SITE

## 目次

- [プロジェクト概要](#about)
- [ディレクトリ構成](#directory)
- [セットアップ](#setup)

<h2 id="about">プロジェクト概要</h2>

### 使用技術

#### nodeバージョン

- Node.js v20.9.0

#### スクリプト

- **開発とビルドスクリプト**

  - `dev`: 開発サーバーを起動
  - `build`: プロジェクトをビルド
  - `preview`: ビルド後のプレビューサーバーを起動

- **コードチェックとフォーマットスクリプト**

  - `prettier`: コードをフォーマット
  - `prettier:fix`: コードをフォーマットし、自動修正
  - `stylelint`: スタイルのリントを実行
  - `stylelint:fix`: スタイルのリントを実行し、自動修正
  - `eslint`: JavaScriptとTypeScriptのリントを実行
  - `lint`: `prettier:fix`、`stylelint:fix`、`eslint`を一括実行

<h2 id="directory">ディレクトリ構成</h2>

```
/
├── public                # 静的ファイル
└── src
    ├── components
    │   ├── cards         # カード型コンポーネント
    │   ├── common        # 共通コンポーネント
    │   ├── icons         # アイコンコンポーネント
    │   ├── layout        # レイアウトに関するコンポーネント
    │   └── pages         # ページ固有のコンポーネント
    ├── constants         # 定数
    ├── layouts           # レイアウト定義
    ├── lib
    ├── pages             # ページ
    └── styles            # スタイル
```

<h2 id="setup">セットアップ</h2>

### 環境変数ファイルの作成

`.env.sample` をコピーして `.env` を作成し、以下の環境変数を設定してください。

| 環境変数名 | 説明                                     |
| ---------- | ---------------------------------------- |
| GTM_ID     | Google Tag ManagerのID (GTM- から始まる) |
| CLARITY_ID | ClarityのID                              |

### パッケージのインストール

```bash
$ npm install
```

### 開発サーバーの起動

```bash
$ npm run dev
```

下記にアスセスできれば OK です<br>
http://localhost:4321/

### ビルド

```bash
$ npm run build
```

`out/` ディレクトリにビルドされたファイルが出力されます

### 枠ツクールの確認

#### /etc/hosts を書き換える

/etc/hosts というファイルを編集します。

- Windows
  - https://help.coreserver.jp/manual/hosts-win/
- Mac
  - https://faq.wadax.ne.jp/s/article/1527

以下の行を書き足します。

```
127.0.0.1 local.dev.nicovideo.jp
```

#### ローカルサーバーを起動

80番ポートでローカルサーバーを起動します。

```bash
$ npm run dev -- --port 80
```

下記にURLで枠ツクールのデータを確認できます

```
http://local.dev.nicovideo.jp/
```
