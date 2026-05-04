# typegrid.js — 仕様書

## 1. ライブラリ概要

- **目的**: ブラウザ上にデザイン用レイアウトグリッドを SVG で表示するデバッグ補助ツール。
  グラフィックデザイナーおよびエンジニアがブラウザ上でレイアウト・タイポグラフィを確認する用途を想定する。
- **作者**: @ytkwsm (Yuta Kawasumi)
- **ライセンス**: MIT
- **リポジトリ**: https://github.com/ytkwsm/typegrid

---

## 2. アーキテクチャ

### 構成パターン

MVC (Model / View / Controller) パターンを採用。

```
main.ts
├── config.ts           ← 定数・デフォルト設定（ライブラリ内部）
├── snippet.ts          ← スクリプトのファイルパス取得
├── user.ts             ← typegrid.json を fetch で取得・検証
├── validate.ts         ← typegrid.json のスキーマ検証
├── utils.ts            ← 共通処理（DOM操作・イベント・計算）
├── model.ts            ← データ管理・状態保持
├── view.ts             ← SVG生成・DOM描画
├── controller.ts       ← イベント統括・MVC の橋渡し
└── gui.ts              ← lil-gui 連携（任意）
```

### 起動フロー

```
typegrid(options?)
  └─ getJSON()                 ← typegrid.json を fetch
       └─ TypegridModel(json)  ← モデル生成
       └─ TypegridView(utils, model)
       └─ TypegridController(utils, model, view, options.gui?)
            ├─ listenMediaQueries()   ← ブレークポイント監視・初期メディア設定
            ├─ checkWindowSize()      ← リサイズ監視
            └─ DOMContentLoaded
                 ├─ view.render('init')  ← DOM 構築・初期描画
                 ├─ keyBinds()           ← キーボードショートカット登録
                 └─ tryInitGui()         ← GUI パネル生成（lil-gui が存在する場合のみ）
```

### ビルド環境

| 項目 | 内容 |
|---|---|
| バンドラ | Vite |
| 言語 | TypeScript |
| 出力形式 | ES Module (`dist/typegrid.js`) / IIFE (`dist/typegrid.iife.js`) |
| テスト | Vitest + jsdom |

---

## 3. API

### `typegrid(options?): TypegridAPI`

typegrid を初期化してパブリック API オブジェクトを返す。  
呼び出し時に `typegrid.json` の fetch と MVC 構築を自動的に開始する。

#### オプション

```typescript
interface TypegridOptions {
  gui?: GuiConstructor; // lil-gui のコンストラクタ（任意）
}
```

`gui` を指定しない場合、`window.lil.GUI`（CDN script タグ読み込み）を自動検出する。

#### 返り値

```typescript
interface TypegridAPI {
  init():    void; // 再初期化（通常は不要）
  destroy(): void; // リスナー・GUI を全て解除
}
```

#### 使用例

```js
// IIFE
typegrid.typegrid();

// ES Module（GUI なし）
import { typegrid } from './typegrid.js';
typegrid();

// ES Module（GUI あり・import 方式）
import { GUI } from 'lil-gui';
import { typegrid } from './typegrid.js';
typegrid({ gui: GUI });
```

---

## 4. typegrid.json スキーマ

### 全体構造

```typescript
interface TypegridConfig {
  general: GeneralSettings;
  media:   MediaSettings;
}
```

### `general`

| フィールド | 型 | 説明 |
|---|---|---|
| `visibility` | `boolean` | 初期表示状態。`false` で非表示起動 |
| `fixed` | `boolean` | `true` = `position: fixed` / `false` = `position: absolute` |
| `deviceDecision` | `"@media"` | デバイス判定方法。現在は `"@media"` のみ実装 |
| `unit.breakPoints` | `string` | ブレークポイントの単位（例: `"px"`） |

### `media`

全ての配列フィールドは `media.devices` と同じ長さで、インデックスでデバイスに対応する。

#### `media.devices`

```json
["mobile", "tablet", "desktop-small", "desktop-mid"]
```

デバイス名の配列。各インデックスが以下の配列と対応する。

#### `media.contents`

| フィールド | 型 | 説明 |
|---|---|---|
| `writingMode` | `string[]` | CSS `writing-mode` の値 |
| `fontSize` | `(number \| "computed")[]` | フォントサイズ (px)。`"computed"` は `<html>` 要素の実測値を使用 |
| `lineHeight` | `number[]` | 行送り比率（`font-size` に対する倍率） |
| `letterSpacing` | `number[]` | 字間（未実装） |
| `breakPoints.width.min` | `number[]` | ブレークポイントの最小幅 |
| `gutter` | `(number \| "auto")[]` | 両端の余白（文字数換算）。`"auto"` = 余白なし（0 扱い） |

#### `media.grids.column`

| フィールド | 型 | 説明 |
|---|---|---|
| `num` | `number[]` | カラム数 |
| `sizeChar` | `("fluid" \| number)[]` | カラム幅。`"fluid"` = 等分割 / 数値 = 文字数換算の固定幅 |
| `gutter` | `number[]` | カラム間の溝幅（文字数換算） |

#### `media.grids.row`

| フィールド | 型 | 説明 |
|---|---|---|
| `height` | `number[]` | 行の高さ（文字数換算） |
| `gutter` | `number[]` | 行間隔（文字数換算） |

#### `media.grids.base` / `media.grids.unit`

| フィールド | 型 | 説明 |
|---|---|---|
| `num` | `number[]` | グリッド数（未実装） |
| `gutter` | `number[]` | 溝幅（未実装） |

### サンプル

```json
{
  "general": {
    "visibility": true,
    "fixed": true,
    "deviceDecision": "@media",
    "unit": { "breakPoints": "px" }
  },
  "media": {
    "devices": ["mobile", "tablet", "desktop-small", "desktop-mid"],
    "contents": {
      "writingMode":   ["horizontal-tb", "horizontal-tb", "horizontal-tb", "horizontal-tb"],
      "fontSize":      [14, 14, 16, "computed"],
      "lineHeight":    [1.75, 1.75, 1.75, 1.75],
      "letterSpacing": [1, 1, 1, 1],
      "breakPoints":   { "width": { "min": [0, 768, 992, 1200] } },
      "gutter":        [1.25, 4, "auto", "auto"]
    },
    "grids": {
      "base":   { "num": [4, 4, 4, 4], "gutter": [2, 2, 2, 2] },
      "column": { "num": [4, 8, 10, 12], "sizeChar": ["fluid", "fluid", 4, 4], "gutter": [1, 2, 2, 2] },
      "row":    { "height": [4.375, 4.375, 4.375, 4.375], "gutter": [1.75, 1.75, 1.75, 1.75] },
      "unit":   { "num": [4, 4, 4, 4], "gutter": [2, 2, 2, 2] }
    }
  }
}
```

---

## 5. グリッド種別

| 種別 | SVG要素 ID | 内容 | 状態 |
|---|---|---|---|
| column | `#tg_layout__body` | カラムグリッド（縦方向の列） | **実装済み** |
| row | `#tg_row__body` | 段組グリッド（横方向の行） | **実装済み** |
| rhythm | `#tg_rhythm__body` | ベースライングリッド（等間隔の横線） | **実装済み** |
| base | `#tg_base__body` | ベースグリッド | 未実装（スタブ） |
| unit | `#tg_unit__body` | ユニットグリッド | 未実装（スタブ） |

### カラムグリッドの計算式

```
gutterBaseWidth        = fontSize × column.gutter
gutterTotal            = gutterBaseWidth × columnNum − gutterBaseWidth
gutterSideEach         = contents.gutter × fontSize  （"auto" の場合は 0）
gutterSideInstallments = (gutterSideEach × 2) / columnNum

columnWidth（fluid）   = (width − gutterTotal) / columnNum − gutterSideInstallments
columnWidth（fixed）   = fontSize × column.sizeChar − gutterSideInstallments

x 座標（n番目カラム） = gutterBaseWidth × n + n × columnWidth + (width − widthAll) / 2
```

### 段組グリッドの計算式

```
rowTotalHeight = (row.height + row.gutter) × fontSize
rowHeightPx    = row.height × fontSize

y 座標（n行目） = n × rowTotalHeight
```

### ベースラインの計算式

```
lineCount = floor((height / fontSize) × lineHeight)
y 座標    = n × fontSize × lineHeight / 2
```

---

## 6. DOM 構造

typegrid が `document.body` の末尾に追加する要素:

```html
<div id="tg_all" role="presentation" aria-hidden="true">
  <style id="tg_style">/* CSS カスタムプロパティ + グリッドスタイル */</style>
  <div id="tg_wrapper">
    <svg id="tg_grid" contain="layout style paint">
      <g id="tg_base">   <g id="tg_base__body"></g></g>
      <g id="tg_unit">   <g id="tg_unit__body"></g></g>
      <g id="tg_sizes">  <g id="tg_sizes__body"></g></g>
      <g id="tg_chars">  <g id="tg_chars__body"></g></g>
      <g id="tg_layout"> <g id="tg_layout__body"><!-- column rects --></g></g>
      <g id="tg_row">    <g id="tg_row__body"><!-- row rects --></g></g>
      <g id="tg_rhythm"> <g id="tg_rhythm__body"><!-- baseline lines --></g></g>
    </svg>
  </div>
  <div id="tg_ruler"><div id="tg_ruler__body"></div></div>
  <div id="tg_settings"></div>
  <div id="tg_gui"><div id="tg_gui__body"></div></div>
</div>
```

---

## 7. CSS カスタムプロパティ

グリッドの色は CSS カスタムプロパティで上書き可能:

```css
:root {
  --tg-color-column: #ff0000;  /* カラムグリッドの色 */
  --tg-color-row:    #ff0000;  /* 段組グリッドの色 */
  --tg-color-rhythm: #999999;  /* ベースラインの色 */
}
```

---

## 8. GUI パネル仕様

`gui.ts` が提供する lil-gui 連携パネル。

### 検出ロジック

```
tryInitGui(model, view, guiConstructor?)
  1. guiConstructor が渡されている → それを使う
  2. window.lil?.GUI が存在する    → それを使う
  3. どちらもない                   → null を返す（GUI なしで通常動作）
```

### パネル構成

```
typegrid
├── Contents
│   ├── font-size (px)      ← contents.fontSize[currentIndex]
│   ├── line-height         ← contents.lineHeight[currentIndex]
│   └── side gutter (rem)   ← contents.gutter[currentIndex]（"auto" → 0）
├── Column
│   ├── columns             ← grids.column.num[currentIndex]
│   └── gutter (rem)        ← grids.column.gutter[currentIndex]
├── Row
│   ├── height (rem)        ← grids.row.height[currentIndex]
│   └── gutter (rem)        ← grids.row.gutter[currentIndex]
└── Export JSON             ← 現在の値を反映した typegrid.json をダウンロード
```

### メディア切替時の動作

ブレークポイントをまたいだとき、パネルの表示値を新しいデバイスの設定値に自動更新する。

### Export JSON の注意

- 現在表示中のデバイスの値のみ書き換える。他のデバイスの値はそのまま。
- `"computed"` / `"auto"` / `"fluid"` として設定していた値は、Export 時に実際の数値に固定される。

---

## 9. パフォーマンス最適化

| 最適化 | 実装箇所 | 内容 |
|---|---|---|
| SVG 差分更新 | `view.ts: syncSvgElements()` | 既存要素を再利用し、追加・削除のみを最小化 |
| メディアキャッシュ | `view.ts: cachedMediaCalc` | メディア切替時のみ再計算するレイアウト定数キャッシュ |
| フォントサイズキャッシュ | `view.ts: cachedFontSize` | `getComputedStyle` の呼び出しを抑制 |
| DOM 要素キャッシュ | `view.ts: elSvgGrid` 等 | 初期化後に `getElementById` を毎回呼ばない |
| ResizeObserver + rAF | `utils.ts: checkWindowSize()` | リサイズを RAF で 1 フレーム 1 回に間引き |
| CSS containment | `#tg_grid` | `contain: layout style paint` で再レイアウト範囲を限定 |
| AbortController | `user.ts / main.ts` | destroy 時に fetch をキャンセル |

---

## 10. 未実装・今後の予定

| 項目 | 詳細 |
|---|---|
| `base()` グリッド | スタブのみ |
| `unit()` グリッド | スタブのみ。文字数 × n の正方形タイルを想定 |
| `ruler()` | スタブのみ |
| `guide()` | スタブのみ |
| 非対称レイアウト対応 | カラムグリッドの左右オフセット指定 |
| `userAgent` 判定 | `deviceDecision: "userAgent"` は未実装（`@media` のみ） |
| `letterSpacing` 反映 | JSON の値は保持するが描画には未使用 |
