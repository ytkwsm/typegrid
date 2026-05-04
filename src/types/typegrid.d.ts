/**
 * typegrid.js — 型定義
 * typegrid.json のスキーマと内部で使用する型をまとめる。
 */

// -----------------------------------------------------------------------
// typegrid.json スキーマ
// -----------------------------------------------------------------------

/** グリッド全体設定の型 */
export interface TypegridConfig {
  general: GeneralSettings;
  media: MediaSettings;
}

/** general セクション */
export interface GeneralSettings {
  /** 初期表示状態 */
  visibility: boolean;
  /** true = fixed / false = absolute */
  fixed: boolean;
  /** デバイス判定方法。現在は "@media" のみ実装 */
  deviceDecision: '@media' | 'userAgent';
  unit: {
    /** ブレークポイントの単位（例: "px"） */
    breakPoints: string;
  };
}

/** media セクション */
export interface MediaSettings {
  /** デバイス名配列。インデックスで各設定を参照する */
  devices: string[];
  contents: MediaContents;
  grids: GridSettings;
}

/** media.contents セクション */
export interface MediaContents {
  writingMode: string[];
  /**
   * フォントサイズ（px）。
   * "computed" を指定すると html 要素の実測値を使用する。
   */
  fontSize: (number | 'computed')[];
  lineHeight: number[];
  letterSpacing: number[];
  breakPoints: {
    width: {
      /** ブレークポイントの最小幅（px）。配列インデックスはデバイスに対応 */
      min: number[];
    };
  };
  /**
   * 両端ガター（文字数換算）。
   * "auto" を指定すると両端スペースなし（0扱い）。
   */
  gutter: (number | 'auto')[];
}

/** media.grids セクション */
export interface GridSettings {
  base: BaseGridConfig;
  column: ColumnGridConfig;
  row: RowGridConfig;
  unit: UnitGridConfig;
}

/** media.grids.base */
export interface BaseGridConfig {
  num: number[];
  gutter: number[];
}

/** media.grids.column */
export interface ColumnGridConfig {
  num: number[];
  /**
   * カラム幅の指定。
   * "fluid" = 利用可能幅を等分割 / number = 文字数換算の固定幅。
   */
  sizeChar: ('fluid' | number)[];
  gutter: number[];
}

/** media.grids.row */
export interface RowGridConfig {
  /** 行の高さ（文字数換算） */
  height: number[];
  gutter: number[];
}

/** media.grids.unit */
export interface UnitGridConfig {
  num: number[];
  gutter: number[];
}

// -----------------------------------------------------------------------
// 内部型
// -----------------------------------------------------------------------

/**
 * 特定のデバイスインデックスに対応した設定値のスナップショット。
 * model.getJsonValues() の戻り値として使用する。
 */
export interface DeviceSnapshot {
  devices: string;
  contents: {
    writingMode: string;
    fontSize: number | 'computed';
    lineHeight: number;
    letterSpacing: number;
    breakPoints: {
      width: {
        min: number;
      };
    };
    gutter: number | 'auto';
  };
  grids: {
    base: {
      num: number;
      gutter: number;
    };
    column: {
      num: number;
      sizeChar: 'fluid' | number;
      gutter: number;
    };
    row: {
      height: number;
      gutter: number;
    };
    unit: {
      num: number;
      gutter: number;
    };
  };
}

/** config.js から export されるライブラリ設定の型 */
export interface LibConfig {
  name: string;
  prefix: string;
  json: {
    file: string;
    storage: string;
  };
}

/** config.js から export されるコンソール色設定の型 */
export interface ConsoleColors {
  red: string;
  green: string;
  blue: string;
}

/** デバッグカウンタの型 */
export interface DebugState {
  count: {
    resize: number;
  };
}
