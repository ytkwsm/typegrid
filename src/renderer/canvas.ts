/**
 * renderer/canvas.ts
 * Canvas ベースのグリッドレンダラー。
 * SVG の代わりに <canvas> を使用してグリッドを描画する。
 * デフォルトレンダラー。
 */

import * as utils from '../utils.js';
import type { TypegridModel } from '../model.js';
import type { DeviceSnapshot } from '../types/typegrid.d.ts';
import type { Renderer } from './types.js';
import {
  type MediaCalcCache,
  type GridLayout,
  buildMediaCalcCache,
  computeGridLayout,
} from '../core/calc.js';

const COLUMN_FILL_ALPHA   = 0.125;
const COLUMN_STROKE_ALPHA = 0.5;
const ROW_FILL_ALPHA      = 0.125;
const ROW_STROKE_ALPHA    = 0.5;
const RHYTHM_STROKE_ALPHA = 0.75;
const RHYTHM_LINE_WIDTH   = 0.5;

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export class TypegridCanvasRenderer implements Renderer {
  currentMedia: DeviceSnapshot | null = null;
  private readonly model: TypegridModel;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private cachedFontSize: number | null = null;
  private cachedMediaCalc: MediaCalcCache | null = null;

  constructor(model: TypegridModel) {
    this.model = model;
  }

  init(): void {
    utils.ensureContainer(this.model.elem.wrapper.containerHtml);
    const tgWrapper = document.getElementById('tg_wrapper');
    if (!tgWrapper) return;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'tg_canvas';
    this.canvas.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;';
    tgWrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.model.wrapperHeight();
    const tgAll = document.getElementById('tg_all');
    if (tgAll) tgAll.style.display = this.model.visibility ? 'block' : 'none';
    utils.insertStyleElem(this.model.config.styleBase);

    this.currentMedia = this.model.currentMedia;
    this.resize();
  }

  resize(): void {
    if (!this.currentMedia || !this.canvas || !this.ctx) return;
    if (this.cachedFontSize === null) {
      this.cachedFontSize = utils.convertComputedFontSize(this.currentMedia.contents.fontSize, 'html');
    }
    if (this.cachedMediaCalc === null) {
      this.cachedMediaCalc = buildMediaCalcCache(this.currentMedia, this.cachedFontSize);
    }
    const width  = this.model.width();
    const height = utils.height();
    this.model.wrapperHeight(height);
    this.canvas.width  = width;
    this.canvas.height = height;
    const gridLayout = computeGridLayout(this.cachedMediaCalc, width, height);
    this.draw(gridLayout, width, height);
  }

  mediaChange(index: number): void {
    this.currentMedia    = this.model.getJsonValues(index);
    this.cachedFontSize  = null;
    this.cachedMediaCalc = null;
    this.resize();
  }

  invalidateMediaCalc(): void {
    this.cachedFontSize  = null;
    this.cachedMediaCalc = null;
  }

  destroy(): void {
    this.canvas?.remove();
    this.canvas          = null;
    this.ctx             = null;
    this.currentMedia    = null;
    this.cachedFontSize  = null;
    this.cachedMediaCalc = null;
  }

  private draw(layout: GridLayout, width: number, height: number): void {
    const ctx = this.ctx!;
    ctx.clearRect(0, 0, width, height);

    const style       = getComputedStyle(document.documentElement);
    const colColor    = style.getPropertyValue('--tg-color-column').trim()  || '#ff0000';
    const rowColor    = style.getPropertyValue('--tg-color-row').trim()     || '#ff0000';
    const rhythmColor = style.getPropertyValue('--tg-color-rhythm').trim()  || '#999999';

    // カラム（fill → stroke）
    ctx.fillStyle = hexToRgba(colColor, COLUMN_FILL_ALPHA);
    for (const col of layout.columns) {
      ctx.fillRect(col.x, 0, col.width, height);
    }
    ctx.strokeStyle = hexToRgba(colColor, COLUMN_STROKE_ALPHA);
    ctx.lineWidth = 1;
    for (const col of layout.columns) {
      ctx.strokeRect(col.x, 0, col.width, height);
    }

    // 行グリッド（fill → stroke）
    ctx.fillStyle = hexToRgba(rowColor, ROW_FILL_ALPHA);
    for (const row of layout.rows) {
      ctx.fillRect(row.x, row.y, row.width, row.height);
    }
    ctx.strokeStyle = hexToRgba(rowColor, ROW_STROKE_ALPHA);
    for (const row of layout.rows) {
      ctx.strokeRect(row.x, row.y, row.width, row.height);
    }

    // リズムライン（一括 beginPath → stroke）
    ctx.strokeStyle = hexToRgba(rhythmColor, RHYTHM_STROKE_ALPHA);
    ctx.lineWidth   = RHYTHM_LINE_WIDTH;
    ctx.beginPath();
    for (const line of layout.rhythmLines) {
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
    }
    ctx.stroke();
  }
}
