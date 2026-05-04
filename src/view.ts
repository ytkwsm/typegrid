/**
 * view.ts
 * SVG生成・DOM描画処理。
 * 旧: src/js/mvc/view.js
 *
 * 変更点:
 * - export default class → export class TypegridView（名前付きクラス）
 * - 全メソッドに引数と戻り値の型を付与
 * - view.grid() の暗黙的グローバル変数 `type = {...}` バグを修正
 * - デバッグ用 console.log を削除
 * - currentMedia の型を DeviceSnapshot | null に変更
 */

import * as utils from './utils.js';
import type { TypegridModel } from './model.js';
import type { DeviceSnapshot } from './types/typegrid.d.ts';

type RenderMode = 'init' | 'resize' | 'change' | 'media';

export class TypegridView {
  readonly utils: typeof utils;
  readonly model: TypegridModel;
  currentMedia: DeviceSnapshot | null = null;

  constructor(utilsModule: typeof utils, model: TypegridModel) {
    this.utils = utilsModule;
    this.model = model;
  }

  wrapper(htmlSet: string, model: TypegridModel): void {
    this.utils.wrapper(htmlSet, model);
  }

  reset(resetElem: Element): void {
    this.utils.reset(resetElem);
  }

  visibility(): void {
    const status = this.model.visibility;
    const target = document.getElementById('tg_all');
    if (!target) return;
    target.setAttribute('style', `display: ${status ? 'block' : 'none'}`);
  }

  render(flg: RenderMode, param1?: number): void {
    if (flg === 'init') {
      this.wrapper(this.model.elem.wrapper.html, this.model);
      this.model.wrapperHeight();
      this.visibility();
      this.utils.insertStyleElem(this.model.config.styleBase);
      this.utils.setSvgSizes('tg_grid', this.model.width(), this.utils.height());
      // listenMediaQueries がセットした currentMedia を取得
      this.currentMedia = this.model.currentMedia;
      this.render('resize');
    } else if (flg === 'resize') {
      if (!this.currentMedia) return;
      const renderFontSize    = this.utils.convertComputedFontSize(this.currentMedia.contents.fontSize, 'html');
      const renderLineHeight  = this.currentMedia.contents.lineHeight;
      const renderWidth       = this.model.width();
      const renderHeight      = this.utils.height();
      this.model.wrapperHeight();
      const renderColumnNum   = this.currentMedia.grids.column.num;
      const renderSizeChar    = this.currentMedia.grids.column.sizeChar;
      const renderRowHeight   = this.currentMedia.grids.row.height;
      const renderRowGutter   = this.currentMedia.grids.row.gutter;
      const renderGutter      = this.currentMedia.grids.column.gutter;
      const renderGutterSide  = this.currentMedia.contents.gutter;
      this.utils.setSvgSizes('tg_grid', renderWidth, renderHeight);
      this.rhythm(renderFontSize, renderLineHeight, renderWidth, renderHeight);
      this.row(renderFontSize, renderLineHeight, renderWidth, renderHeight, renderRowHeight, renderRowGutter);
      this.layout(renderFontSize, renderWidth, renderHeight, renderColumnNum, renderSizeChar, renderGutter, renderGutterSide);
      this.base();
      this.unit();
    } else if (flg === 'change') {
      this.unit();
    } else if (flg === 'media') {
      if (param1 === undefined) return;
      this.currentMedia = this.model.getJsonValues(param1);
    }
  }

  base(): void {
    // TODO: 実装予定
  }

  unit(): void {
    // TODO: 実装予定
  }

  layout(
    currentFontSize: number,
    currentWidth: number,
    currentHeight: number,
    currentColumnNum: number,
    currentSizeChar: 'fluid' | number,
    currentGutter: number,
    currentGutterSide: number | 'auto',
  ): void {
    const fontSize          = currentFontSize;
    const width             = currentWidth;
    const height            = currentHeight;
    const columnNum         = currentColumnNum;
    const gutterBaseWidth   = fontSize * currentGutter;
    const guttterTotal      = gutterBaseWidth * columnNum - gutterBaseWidth;

    const gutterSideEach         = this.utils.decisionGutterSideType(currentGutterSide, fontSize);
    const gutterSideInstallments = (gutterSideEach * 2) / columnNum;
    const columnWidth            = this.utils.decisionColumnSizeType(
      fontSize, currentSizeChar, width, columnNum, guttterTotal, gutterSideInstallments,
    );
    const widthTotal             = columnWidth * columnNum;
    const widthAll               = guttterTotal + widthTotal;
    const gutterOutsideWidthOneSide = (width - widthAll) / 2;

    const targetInsert = document.getElementById('tg_layout__body');
    if (!targetInsert) return;
    this.reset(targetInsert);

    const fragGrids = document.createDocumentFragment();
    for (let cnt = 0; cnt < columnNum; cnt++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('class', `rect-x${cnt}`);
      rect.setAttribute('x', String(gutterBaseWidth * cnt + cnt * columnWidth + gutterOutsideWidthOneSide));
      rect.setAttribute('y', '0');
      rect.setAttribute('width', String(columnWidth));
      rect.setAttribute('height', String(height));
      rect.setAttribute('fill', '#ff0000');
      rect.setAttribute('fill-opacity', '0.125');
      rect.setAttribute('stroke', '#ff0000');
      rect.setAttribute('stroke-opacity', '0.5');
      fragGrids.appendChild(rect);
    }
    targetInsert.appendChild(fragGrids);
  }

  row(
    currentFontSize: number,
    _currentLineHeight: number,
    currentWidth: number,
    currentHeight: number,
    currentRowHeight: number,
    currentRowGutter: number,
  ): void {
    const fontSize       = currentFontSize;
    const width          = currentWidth;
    const height         = currentHeight;
    const rowHeight      = currentRowHeight;
    const rowGutter      = currentRowGutter;
    const rowTotalChar   = rowHeight + rowGutter;
    const rowTotalHeight = rowTotalChar * fontSize;
    const loopNum        = Math.floor(height / rowTotalHeight) + 1;

    const targetInsert = document.getElementById('tg_row__body');
    if (!targetInsert) return;
    this.reset(targetInsert);

    const fragGrids = document.createDocumentFragment();
    for (let cnt = 0; cnt < loopNum; cnt++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('class', `row-y${cnt}`);
      rect.setAttribute('x', '0');
      rect.setAttribute('y', String(Math.floor(cnt * rowHeight * fontSize + cnt * rowGutter * fontSize)));
      rect.setAttribute('width', String(width));
      rect.setAttribute('height', String(rowHeight * fontSize));
      rect.setAttribute('fill', '#ff0000');
      rect.setAttribute('fill-opacity', '0.125');
      rect.setAttribute('stroke', '#ff0000');
      rect.setAttribute('stroke-opacity', '0.5');
      fragGrids.appendChild(rect);
    }
    targetInsert.appendChild(fragGrids);
  }

  rhythm(
    currentFontSize: number,
    currentLineHeight: number,
    currentWidth: number,
    currentHeight: number,
  ): void {
    const fontSize  = currentFontSize;
    const lineHeight = currentLineHeight;
    const width     = currentWidth;
    const height    = currentHeight;
    const loopNum   = Math.floor((height / fontSize) * lineHeight);

    const targetInsert = document.getElementById('tg_rhythm__body');
    if (!targetInsert) return;
    this.reset(targetInsert);

    const fragGrids = document.createDocumentFragment();
    for (let cnt = 0; cnt < loopNum; cnt++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', `line-y${cnt}`);
      line.setAttribute('x1', '0');
      line.setAttribute('y1', String(cnt * fontSize * lineHeight / 2));
      line.setAttribute('x2', String(width));
      line.setAttribute('y2', String(cnt * fontSize * lineHeight / 2));
      line.setAttribute('fill', 'none');
      line.setAttribute('stroke', '#999999');
      line.setAttribute('stroke-width', '0.5');
      line.setAttribute('stroke-opacity', '0.75');
      fragGrids.appendChild(line);
    }
    targetInsert.appendChild(fragGrids);
  }

  ruler(): void {
    // TODO: 実装予定
  }

  guide(): void {
    // TODO: 実装予定
  }

  gui(): void {
    // TODO: 実装予定
  }

  keyboard(): void {
    // TODO: 実装予定
  }

  size(): void {
    // TODO: 実装予定
  }
}

