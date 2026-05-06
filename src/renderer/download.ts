/**
 * renderer/download.ts
 * SVG 文字列生成と Canvas 描画の共有ロジック。
 * ダウンロードトリガーも提供する。
 */

import type { GridLayout } from '../core/calc.js';

export type GridColors = {
  column: string;
  row: string;
  rhythm: string;
};

/** CSS カスタムプロパティからグリッドカラーを読み取る */
export function readGridColors(): GridColors {
  const s = getComputedStyle(document.documentElement);
  return {
    column: s.getPropertyValue('--tg-color-column').trim() || '#ff0000',
    row:    s.getPropertyValue('--tg-color-row').trim()    || '#ff0000',
    rhythm: s.getPropertyValue('--tg-color-rhythm').trim() || '#999999',
  };
}

/** hex + alpha → rgba 文字列 */
export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** GridLayout を Canvas コンテキストに描画する（画面外描画・エクスポート共用） */
export function drawGridToCanvas(
  ctx: CanvasRenderingContext2D,
  layout: GridLayout,
  width: number,
  height: number,
  colors: GridColors,
): void {
  ctx.clearRect(0, 0, width, height);

  // カラム（fill → stroke）
  ctx.fillStyle = hexToRgba(colors.column, 0.125);
  for (const col of layout.columns) ctx.fillRect(col.x, 0, col.width, height);
  ctx.strokeStyle = hexToRgba(colors.column, 0.5);
  ctx.lineWidth = 1;
  for (const col of layout.columns) ctx.strokeRect(col.x, 0, col.width, height);

  // 行グリッド（fill → stroke）
  ctx.fillStyle = hexToRgba(colors.row, 0.125);
  for (const row of layout.rows) ctx.fillRect(row.x, row.y, row.width, row.height);
  ctx.strokeStyle = hexToRgba(colors.row, 0.5);
  for (const row of layout.rows) ctx.strokeRect(row.x, row.y, row.width, row.height);

  // リズムライン（一括 path）
  ctx.strokeStyle = hexToRgba(colors.rhythm, 0.75);
  ctx.lineWidth   = 0.5;
  ctx.beginPath();
  for (const line of layout.rhythmLines) {
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
  }
  ctx.stroke();
}

/** GridLayout から SVG 文字列を生成する（DOM 生成なし） */
export function buildSvgString(
  layout: GridLayout,
  width: number,
  height: number,
  colors: GridColors,
): string {
  const colFill      = hexToRgba(colors.column, 0.125);
  const colStroke    = hexToRgba(colors.column, 0.5);
  const rowFill      = hexToRgba(colors.row, 0.125);
  const rowStroke    = hexToRgba(colors.row, 0.5);
  const rhythmStroke = hexToRgba(colors.rhythm, 0.75);

  const cols = layout.columns.map(c =>
    `<rect x="${c.x}" y="0" width="${c.width}" height="${height}" fill="${colFill}" stroke="${colStroke}" stroke-width="1"/>`
  ).join('');

  const rows = layout.rows.map(r =>
    `<rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" fill="${rowFill}" stroke="${rowStroke}" stroke-width="1"/>`
  ).join('');

  const lines = layout.rhythmLines.map(l =>
    `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="${rhythmStroke}" stroke-width="0.5"/>`
  ).join('');

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`,
    `<g id="tg_layout">${cols}</g>`,
    `<g id="tg_row">${rows}</g>`,
    `<g id="tg_rhythm">${lines}</g>`,
    `</svg>`,
  ].join('');
}

/** Blob をファイルとしてダウンロードさせる */
export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
