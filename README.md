# typegrid.js

ブラウザ上にレイアウトグリッドを SVG で重ねて表示するデバッグ補助ツール。  
デザイナーとエンジニアが「カラムグリッド・行グリッド・ベースライン」をブラウザで確認するために使う。

## デモ

- [GUI デモ](demo/gui.html) — lil-gui でリアルタイム調整 + JSON ダウンロード

## インストール

```sh
npm install
npm run dev    # 開発サーバー起動
npm run build  # dist/ へビルド
```

## 使い方

### 基本（グリッド表示のみ）

IIFE ビルドを使う場合:

```html
<script src="typegrid.iife.js"></script>
<script>
  typegrid.typegrid();
</script>
```

ES モジュールとして使う場合:

```html
<script type="module">
  import { typegrid } from './typegrid.js';
  typegrid();
</script>
```

`typegrid.json` をスクリプトと同じディレクトリに置いてください。

---

## GUI パネル（lil-gui 連携）

[lil-gui](https://lil-gui.georgealways.com/) を使って設定をリアルタイムで変更できる GUI パネルを提供する。  
グリッドを調整した後、現在の状態を新しい `typegrid.json` としてダウンロードできる。

**lil-gui は typegrid のバンドルには含まれない。** 以下どちらかの方法で有効にする。

---

### 方法 A — CDN script タグ（追加コードなし）

```html
<!-- lil-gui を typegrid より先に読み込む -->
<script src="https://cdn.jsdelivr.net/npm/lil-gui@0.20"></script>

<script src="typegrid.iife.js"></script>
<script>
  typegrid.typegrid(); // window.lil.GUI を自動検出して GUI を起動する
</script>
```

---

### 方法 B — JS import（バンドル環境）

```js
import { GUI } from 'lil-gui';
import { typegrid } from './typegrid.js';

typegrid({ gui: GUI }); // GUI コンストラクタを明示的に渡す
```

---

### GUI パネルで調整できる項目

| 項目 | 説明 |
|---|---|
| `font-size (px)` | フォントサイズ。グリッドの基準単位 |
| `line-height` | 行送り比率（ベースラインリズムに影響） |
| `side gutter (rem)` | 両端の余白（rem 換算） |
| `columns` | カラム数 |
| `column gutter (rem)` | カラム間の溝幅（rem 換算） |
| `row height (rem)` | 段組の行高さ（rem 換算） |
| `row gutter (rem)` | 段組の行間隔（rem 換算） |

**Export JSON** ボタンを押すと、現在の値が反映された `typegrid.json` をダウンロードできる。

> `"computed"` や `"fluid"` / `"auto"` として設定していた値は、Export 時に実際の数値に固定される。

---

## キーボードショートカット

| キー | 動作 |
|---|---|
| `g` | グリッドの表示 / 非表示トグル |
| `p` | `position: fixed` / `position: absolute` 切替 |

---

## typegrid.json

グリッドの設定ファイル。スクリプトと同じディレクトリに配置する。

詳細なスキーマは [docs/SPEC.md](docs/SPEC.md) を参照。

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
      "breakPoints": { "width": { "min": [0, 768, 992, 1200] } },
      "gutter":        [1.25, 4, "auto", "auto"]
    },
    "grids": {
      "column": {
        "num":      [4, 8, 10, 12],
        "sizeChar": ["fluid", "fluid", 4, 4],
        "gutter":   [1, 2, 2, 2]
      },
      "row":    { "height": [4.375, 4.375, 4.375, 4.375], "gutter": [1.75, 1.75, 1.75, 1.75] },
      "base":   { "num": [4, 4, 4, 4], "gutter": [2, 2, 2, 2] },
      "unit":   { "num": [4, 4, 4, 4], "gutter": [2, 2, 2, 2] }
    }
  }
}
```

---

## ライセンス

MIT — [@ytkwsm](https://github.com/ytkwsm)
