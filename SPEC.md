# typegrid.js — 仕様書

## 1. ライブラリ概要

- **目的**: ブラウザ上にデザイン用レイアウトグリッドをSVGで表示するデバッグ補助ツール。  
  グラフィックデザイナーおよびエンジニアがブラウザ上でレイアウト・タイポグラフィを確認する用途を想定する。
- **作者**: @ytkwsm (Yuta Kawasumi)
- **ライセンス**: MIT
- **リポジトリ**: https://github.com/ytkwsm/typegrid

---

## 2. アーキテクチャ（現状）

### 構成パターン

MVC (Model / View / Controller) パターンを採用。

```
main.js
├── data/config.js         ← 定数・デフォルト設定（ライブラリ内部設定）
├── modules/snippet.js     ← スクリプトのファイルパス取得
├── modules/user.js        ← typegrid.json を fetch で取得
├── modules/utils.js       ← 共通処理（DOM操作・イベント・計算）
├── mvc/model.js           ← データ管理・状態保持
├── mvc/view.js            ← SVG生成・DOM描画
└── mvc/controller.js      ← イベント統括・MVCの橋渡し
```

### ビルド環境（現状）

- **バンドラ**: webpack 4
- **トランスパイラ**: Babel (babel-preset-env / ES5変換)
- **タスクランナー**: gulp 3 (browser-sync / scss / strip-debug)
- **出力先**: `dest/js/typegrid.js`
- **Node.js バージョン**: v9.4.0（.node-version）

### 起動フロー

1. `main.js` が `user.js` 経由で `typegrid.json` を fetch
2. JSON取得成功後に `MyModel` → `MyView` → `MyController` を順番にインスタンス化
3. `window.__typegrid = new App()` としてグローバルに公開
4. Controller が `media()` / `init()` / `resize()` / `keyBinds()` を起動

---

## 3. 機能一覧

### SVGオーバーレイ生成

- `#tg_all` ルートdivを `document.body` の末尾に追加
- スタイル: `position: absolute; z-index: 99900; pointer-events: none`
- `#tg_all` 配下に `<style id="tg_style">` を挿入してオーバーレイのCSSを適用

### グリッド種別

| 種別 | ID | 内容 |
|---|---|---|
| layout | `#tg_layout__body` | カラムグリッド（縦方向の列） |
| row | `#tg_row__body` | 段組グリッド（横方向の行） |
| rhythm | `#tg_rhythm__body` | ベースライングリッド（等間隔の横線） |
| base | `#tg_base__body` | 未実装（スタブのみ） |
| unit | `#tg_unit__body` | 未実装（スタブのみ） |

### レスポンシブ対応

- `window.matchMedia` によるブレークポイント切替
- JSON の `media.contents.breakPoints.width.min` を元にメディアクエリ文字列を生成
- マッチしたデバイスインデックスで `model.getJsonValues(index)` を呼び出し、描画パラメータを切替

### リサイズ対応

- `window.addEventListener("resize", ...)` によるリサイズ検知
- **デバウンス**: 300ms タイマーで間引き処理

### キーボードショートカット

| キー | 動作 |
|---|---|
| `g` | グリッドの表示 / 非表示トグル |
| `p` | `position: fixed` / `position: absolute` 切替 |

### 外部設定ファイル

- `typegrid.json` を `fetch()` で読み込む
- ファイルパスは `snippet.js` でスクリプトのURLから自動解決

---

## 4. typegrid.json 設定スキーマ

```json
{
  "general": {
    "visibility": true,
    "fixed": true,
    "deviceDecision": "@media",
    "unit": {
      "breakPoints": "px"
    }
  },
  "media": {
    "devices": ["mobile", "tablet", "desktop-small", "desktop-mid"],
    "contents": {
      "writingMode":   ["horizontal-tb", "horizontal-tb", "horizontal-tb", "horizontal-tb"],
      "fontSize":      [14, 14, 16, "computed"],
      "lineHeight":    [1.75, 1.75, 1.75, 1.75],
      "letterSpacing": [1, 1, 1, 1],
      "breakPoints": {
        "width": {
          "min": [0, 768, 992, 1200]
        }
      },
      "gutter": [1.25, 4, "auto", "auto"]
    },
    "grids": {
      "base": {
        "num":    [4, 4, 4, 4],
        "gutter": [2, 2, 2, 2]
      },
      "column": {
        "num":      [4, 8, 10, 12],
        "sizeChar": ["fluid", "fluid", 4, 4],
        "gutter":   [1, 2, 2, 2]
      },
      "row": {
        "height": [4.375, 4.375, 4.375, 4.375],
        "gutter": [1.75, 1.75, 1.75, 1.75]
      },
      "unit": {
        "num":    [4, 4, 4, 4],
        "gutter": [2, 2, 2, 2]
      }
    }
  }
}
```

### フィールド説明

| フィールド | 型 | 説明 |
|---|---|---|
| `general.visibility` | boolean | 初期表示状態 |
| `general.fixed` | boolean | `fixed` / `absolute` の初期値 |
| `general.deviceDecision` | `"@media"` \| `"userAgent"` | デバイス判定方法 |
| `general.unit.breakPoints` | string | ブレークポイントの単位（"px"） |
| `media.devices` | string[] | デバイス名の配列（インデックスで参照） |
| `media.contents.fontSize` | `(number \| "computed")[]` | フォントサイズ。`"computed"` は `html` 要素の実測値を使用 |
| `media.contents.gutter` | `(number \| "auto")[]` | サイドガター。`"auto"` は両端スペースなし |
| `media.grids.column.sizeChar` | `("fluid" \| number)[]` | カラム幅。`"fluid"` は等分割、数値は文字数換算 |

---

## 5. DOM構造

```html
<body>
  <!-- ...既存コンテンツ... -->

  <!-- typegrid が body末尾に追加 -->
  <div id="tg_all" role="presentation" aria-hidden="true">
    <style id="tg_style">/* オーバーレイCSS */</style>
    <div id="tg_wrapper">
      <svg id="tg_grid">
        <g id="tg_base">
          <g id="tg_base__body"></g>
        </g>
        <g id="tg_unit">
          <g id="tg_unit__body"></g>
        </g>
        <g id="tg_layout">
          <g id="tg_layout__body"></g>  <!-- カラムグリッド -->
        </g>
        <g id="tg_row">
          <g id="tg_row__body"></g>     <!-- 段組グリッド -->
        </g>
        <g id="tg_rhythm">
          <g id="tg_rhythm__body"></g>  <!-- ベースライン -->
        </g>
      </svg>
    </div>
    <div id="tg_ruler">
      <div id="tg_ruler__body"></div>
    </div>
    <div id="tg_settings"></div>
    <div id="tg_gui">
      <div id="tg_gui__body"></div>
    </div>
  </div>
</body>
```

---

## 6. 現在の課題・未実装箇所

| 項目 | 状態 | 詳細 |
|---|---|---|
| `userAgent` 判定 | 未対応 | `deviceDecision: "userAgent"` は警告ログを出すのみ。`@media` のみ実装済み |
| `base()` | スタブ | model / view ともに console.log のみ |
| `unit()` | スタブ | model / view ともに console.log のみ |
| `gui()` | スタブ | model / view ともに console.log のみ |
| `ruler()` | スタブ | model / view ともに console.log のみ |
| `matchMedia.addListener` | 非推奨 | `addEventListener('change', ...)` への移行が必要（utils.js L423） |
| `this` コンテキスト依存 | 問題あり | `utils.js` の `listenMediaQueries` 等が `this` に `_self` を bind して使用しており、関数として export すると `this` が undefined になる |
| `window.__typegrid` | グローバル汚染 | named export への移行が必要 |
| `console.log` 過多 | 要整理 | デバッグ用 console.log が大量に残存 |
| `view.js` の `grid()` | バグ | メソッド内で `type = {...}` と宣言しており、変数宣言がない（暗黙的グローバル） |

---

## 7. TypeScript移行方針（フェーズ2）

### ビルド環境

| 項目 | 移行前 | 移行後 |
|---|---|---|
| バンドラ | webpack 4 + Babel | Vite |
| 言語 | JavaScript (ES6+) | TypeScript 5.x |
| 出力先 | `dest/js/` | `dist/` |
| スクリプト | gulp + webpack-stream | `vite dev` / `vite build` |

### ファイル構成（移行後）

```
src/
├── types/
│   └── typegrid.d.ts       ← 型定義（JSONスキーマ・内部型）
├── config.ts               ← 旧 data/config.js
├── snippet.ts              ← 旧 modules/snippet.js
├── user.ts                 ← 旧 modules/user.js
├── utils.ts                ← 旧 modules/utils.js
├── model.ts                ← 旧 mvc/model.js
├── view.ts                 ← 旧 mvc/view.js
├── controller.ts           ← 旧 mvc/controller.js
└── main.ts                 ← エントリポイント
```

旧 `src/js/` は参照用として残す（削除しない）。
