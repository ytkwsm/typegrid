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
import {
  type GridColors,
  buildSvgString,
  drawGridToCanvas,
  readGridColors,
} from './download.js';

export class TypegridCanvasRenderer implements Renderer {
  currentMedia: DeviceSnapshot | null = null;
  private readonly model: TypegridModel;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private cachedFontSize: number | null = null;
  private cachedMediaCalc: MediaCalcCache | null = null;
  private cachedColors: GridColors | null = null;
  private lastWidth:  number = 0;
  private lastHeight: number = 0;

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
    this.lastWidth  = width;
    this.lastHeight = height;
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
    this.cachedColors    = null;
    this.resize();
  }

  invalidateMediaCalc(): void {
    this.cachedFontSize  = null;
    this.cachedMediaCalc = null;
    this.cachedColors    = null;
  }

  destroy(): void {
    this.canvas?.remove();
    this.canvas          = null;
    this.ctx             = null;
    this.currentMedia    = null;
    this.cachedFontSize  = null;
    this.cachedMediaCalc = null;
    this.cachedColors    = null;
  }

  exportSvg(): string | null {
    if (!this.cachedMediaCalc) return null;
    const layout = computeGridLayout(this.cachedMediaCalc, this.lastWidth, this.lastHeight);
    return buildSvgString(layout, this.lastWidth, this.lastHeight, readGridColors());
  }

  exportPng(): Promise<Blob | null> {
    // 既存の canvas を直接使用するため再描画不要
    if (!this.canvas) return Promise.resolve(null);
    return new Promise(resolve => {
      this.canvas!.toBlob(blob => resolve(blob), 'image/png');
    });
  }

  private draw(layout: GridLayout, width: number, height: number): void {
    if (!this.ctx) return;
    this.cachedColors ??= readGridColors();
    drawGridToCanvas(this.ctx, layout, width, height, this.cachedColors);
  }
}
