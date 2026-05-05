/**
 * core/calc.ts
 * グリッドレイアウトの純粋計算関数。DOM に一切触れない。
 * SVG・Canvas・ダウンロード各レンダラーの共通コア。
 */

import * as utils from '../utils.js';
import type { DeviceSnapshot } from '../types/typegrid.d.ts';

// -----------------------------------------------------------------------
// 中間キャッシュ型（メディア変化時のみ再計算）
// -----------------------------------------------------------------------

export type MediaCalcCache = {
  fontSize:              number;
  lineHeight:            number;
  columnNum:             number;
  sizeChar:              'fluid' | number;
  gutterBaseWidth:       number;
  gutterTotal:           number;
  gutterSideEach:        number;
  gutterSideInstallments:number;
  rowTotalHeight:        number;
  rowHeightPx:           number;
};

// -----------------------------------------------------------------------
// レイアウトデータ型（リサイズごとに計算）
// -----------------------------------------------------------------------

export type ColumnRect = { x: number; width: number; height: number };
export type RowRect    = { x: number; y: number; width: number; height: number };
export type RhythmLine = { x1: number; y1: number; x2: number; y2: number };

export type GridLayout = {
  columns:     ColumnRect[];
  rows:        RowRect[];
  rhythmLines: RhythmLine[];
};

// -----------------------------------------------------------------------
// 関数
// -----------------------------------------------------------------------

/** DeviceSnapshot + fontSize → MediaCalcCache（メディア変化時のみ呼ぶ） */
export function buildMediaCalcCache(media: DeviceSnapshot, fontSize: number): MediaCalcCache {
  const columnNum              = media.grids.column.num;
  const gutter                 = media.grids.column.gutter;
  const gutterBaseWidth        = fontSize * gutter;
  const gutterTotal            = gutterBaseWidth * columnNum - gutterBaseWidth;
  const gutterSideEach         = utils.decisionGutterSideType(media.contents.gutter, fontSize);
  const gutterSideInstallments = (gutterSideEach * 2) / columnNum;
  const rowHeight              = media.grids.row.height;
  const rowGutter              = media.grids.row.gutter;
  return {
    fontSize,
    lineHeight:             media.contents.lineHeight,
    columnNum,
    sizeChar:               media.grids.column.sizeChar,
    gutterBaseWidth,
    gutterTotal,
    gutterSideEach,
    gutterSideInstallments,
    rowTotalHeight:         (rowHeight + rowGutter) * fontSize,
    rowHeightPx:            rowHeight * fontSize,
  };
}

/** カラムグリッドの描画データを返す */
export function computeColumns(cache: MediaCalcCache, width: number, height: number): ColumnRect[] {
  const { fontSize, columnNum, sizeChar, gutterBaseWidth, gutterTotal, gutterSideInstallments } = cache;
  const columnWidth   = utils.decisionColumnSizeType(
    fontSize, sizeChar, width, columnNum, gutterTotal, gutterSideInstallments,
  );
  const widthAll      = gutterTotal + columnWidth * columnNum;
  const gutterOutside = (width - widthAll) / 2;
  const columnStep    = gutterBaseWidth + columnWidth;
  const columns: ColumnRect[] = [];
  for (let i = 0; i < columnNum; i++) {
    columns.push({ x: i * columnStep + gutterOutside, width: columnWidth, height });
  }
  return columns;
}

/** 行グリッドの描画データを返す */
export function computeRows(cache: MediaCalcCache, width: number, height: number): RowRect[] {
  const { rowTotalHeight, rowHeightPx } = cache;
  const loopNum = Math.floor(height / rowTotalHeight) + 1;
  const rows: RowRect[] = [];
  for (let i = 0; i < loopNum; i++) {
    rows.push({ x: 0, y: Math.floor(i * rowTotalHeight), width, height: rowHeightPx });
  }
  return rows;
}

/** ベースラインリズムの描画データを返す */
export function computeRhythm(cache: MediaCalcCache, width: number, height: number): RhythmLine[] {
  const { fontSize, lineHeight } = cache;
  const loopNum    = Math.floor((height / fontSize) * lineHeight);
  const rhythmStep = fontSize * lineHeight / 2;
  const lines: RhythmLine[] = [];
  for (let i = 0; i < loopNum; i++) {
    const y = i * rhythmStep;
    lines.push({ x1: 0, y1: y, x2: width, y2: y });
  }
  return lines;
}

/** カラム・行・リズム全グリッドの描画データをまとめて返す */
export function computeGridLayout(cache: MediaCalcCache, width: number, height: number): GridLayout {
  return {
    columns:     computeColumns(cache, width, height),
    rows:        computeRows(cache, width, height),
    rhythmLines: computeRhythm(cache, width, height),
  };
}
