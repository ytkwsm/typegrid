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

/** メディアが変わった時のみ再計算するレイアウト定数のキャッシュ */
type MediaCalcCache = {
  fontSize: number;
  lineHeight: number;
  columnNum: number;
  sizeChar: 'fluid' | number;
  gutterBaseWidth: number;
  gutterTotal: number;
  gutterSideEach: number;
  gutterSideInstallments: number;
  rowTotalHeight: number;   // (rowHeight + rowGutter) * fontSize — 行間隔（y位置計算用）
  rowHeightPx: number;      // rowHeight * fontSize — 行の高さ（rect height用）
};

const SVG_NS = 'http://www.w3.org/2000/svg';

export class TypegridView {
  readonly utils: typeof utils;
  readonly model: TypegridModel;
  currentMedia: DeviceSnapshot | null = null;
  private cachedFontSize: number | null = null;
  private cachedMediaCalc: MediaCalcCache | null = null;

  /** render('init') 後にキャッシュするDOM要素（毎フレームの getElementById を省略） */
  private elSvgGrid:    Element | null = null;
  private elLayoutBody: Element | null = null;
  private elRowBody:    Element | null = null;
  private elRhythmBody: Element | null = null;

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

  /**
   * SVG子要素を差分更新する。
   * 既存要素の属性を上書きし、不足分を追加、余剰分を削除する。
   */
  private syncSvgElements<T extends SVGElement>(
    container: Element,
    count: number,
    tagName: string,
    setAttrs: (el: T, i: number) => void,
  ): void {
    const children = container.children;

    for (let i = 0; i < Math.min(children.length, count); i++) {
      setAttrs(children[i] as T, i);
    }

    const frag = document.createDocumentFragment();
    for (let i = children.length; i < count; i++) {
      const el = document.createElementNS(SVG_NS, tagName) as T;
      setAttrs(el, i);
      frag.appendChild(el);
    }
    if (frag.childNodes.length > 0) container.appendChild(frag);

    while (container.children.length > count) {
      container.lastElementChild!.remove();
    }
  }

  /** cachedFontSize / cachedMediaCalc を破棄する。GUI から値を変更した後に呼ぶ */
  invalidateMediaCalc(): void {
    this.cachedFontSize  = null;
    this.cachedMediaCalc = null;
  }

  visibility(): void {
    const status = this.model.visibility;
    const target = document.getElementById('tg_all');
    if (!target) return;
    target.style.display = status ? 'block' : 'none';
  }

  render(flg: RenderMode, param1?: number): void {
    if (flg === 'init') {
      this.wrapper(this.model.elem.wrapper.html, this.model);
      this.elSvgGrid    = document.getElementById('tg_grid');
      this.elLayoutBody = document.getElementById('tg_layout__body');
      this.elRowBody    = document.getElementById('tg_row__body');
      this.elRhythmBody = document.getElementById('tg_rhythm__body');
      this.model.wrapperHeight();
      this.visibility();
      this.utils.insertStyleElem(this.model.config.styleBase);
      this.utils.setSvgSizes(this.elSvgGrid, this.model.width(), this.utils.height());
      // listenMediaQueries がセットした currentMedia を取得
      this.currentMedia = this.model.currentMedia;
      this.render('resize');
    } else if (flg === 'resize') {
      if (!this.currentMedia) return;
      if (this.cachedFontSize === null) {
        this.cachedFontSize = this.utils.convertComputedFontSize(this.currentMedia.contents.fontSize, 'html');
      }
      if (this.cachedMediaCalc === null) {
        const fontSize    = this.cachedFontSize;
        const columnNum   = this.currentMedia.grids.column.num;
        const gutter      = this.currentMedia.grids.column.gutter;
        const gutterSide  = this.currentMedia.contents.gutter;
        const rowHeight   = this.currentMedia.grids.row.height;
        const rowGutter   = this.currentMedia.grids.row.gutter;
        const gutterBaseWidth        = fontSize * gutter;
        const gutterTotal            = gutterBaseWidth * columnNum - gutterBaseWidth;
        const gutterSideEach         = this.utils.decisionGutterSideType(gutterSide, fontSize);
        const gutterSideInstallments = (gutterSideEach * 2) / columnNum;
        this.cachedMediaCalc = {
          fontSize, lineHeight: this.currentMedia.contents.lineHeight,
          columnNum, sizeChar: this.currentMedia.grids.column.sizeChar,
          gutterBaseWidth, gutterTotal, gutterSideEach, gutterSideInstallments,
          rowTotalHeight: (rowHeight + rowGutter) * fontSize,
          rowHeightPx:    rowHeight * fontSize,
        };
      }
      const calc         = this.cachedMediaCalc;
      const renderWidth  = this.model.width();
      const renderHeight = this.utils.height();
      this.model.wrapperHeight(renderHeight);
      this.utils.setSvgSizes(this.elSvgGrid, renderWidth, renderHeight);
      this.rhythm(calc, renderWidth, renderHeight);
      this.row(calc, renderWidth, renderHeight);
      this.layout(calc, renderWidth, renderHeight);
      this.base();
      this.unit();
    } else if (flg === 'change') {
      this.unit();
    } else if (flg === 'media') {
      if (param1 === undefined) return;
      this.currentMedia = this.model.getJsonValues(param1);
      this.cachedFontSize   = null;
      this.cachedMediaCalc  = null;
    }
  }

  base(): void {
    // TODO: 実装予定
  }

  unit(): void {
    // TODO: 実装予定
  }

  private layout(calc: MediaCalcCache, width: number, height: number): void {
    const { fontSize, columnNum, sizeChar, gutterBaseWidth, gutterTotal, gutterSideInstallments } = calc;
    const columnWidth               = this.utils.decisionColumnSizeType(
      fontSize, sizeChar, width, columnNum, gutterTotal, gutterSideInstallments,
    );
    const widthAll                  = gutterTotal + columnWidth * columnNum;
    const gutterOutsideWidthOneSide = (width - widthAll) / 2;
    const columnStep                = gutterBaseWidth + columnWidth;
    const columnWidthStr            = String(columnWidth);
    const heightStr                 = String(height);

    const targetInsert = this.elLayoutBody;
    if (!targetInsert) return;

    this.syncSvgElements<SVGRectElement>(targetInsert, columnNum, 'rect', (rect, cnt) => {
      rect.setAttribute('class', `rect-x${cnt}`);
      rect.setAttribute('x', String(cnt * columnStep + gutterOutsideWidthOneSide));
      rect.setAttribute('y', '0');
      rect.setAttribute('width', columnWidthStr);
      rect.setAttribute('height', heightStr);
    });
  }

  private row(calc: MediaCalcCache, width: number, height: number): void {
    const { rowTotalHeight, rowHeightPx } = calc;
    const loopNum       = Math.floor(height / rowTotalHeight) + 1;
    const widthStr      = String(width);
    const rowHeightStr  = String(rowHeightPx);

    const targetInsert = this.elRowBody;
    if (!targetInsert) return;

    this.syncSvgElements<SVGRectElement>(targetInsert, loopNum, 'rect', (rect, cnt) => {
      rect.setAttribute('class', `row-y${cnt}`);
      rect.setAttribute('x', '0');
      rect.setAttribute('y', String(Math.floor(cnt * rowTotalHeight)));
      rect.setAttribute('width', widthStr);
      rect.setAttribute('height', rowHeightStr);
    });
  }

  private rhythm(calc: MediaCalcCache, width: number, height: number): void {
    const { fontSize, lineHeight } = calc;
    const loopNum    = Math.floor((height / fontSize) * lineHeight);
    const rhythmStep = fontSize * lineHeight / 2;
    const widthStr   = String(width);

    const targetInsert = this.elRhythmBody;
    if (!targetInsert) return;

    this.syncSvgElements<SVGLineElement>(targetInsert, loopNum, 'line', (line, cnt) => {
      const y = String(cnt * rhythmStep);
      line.setAttribute('class', `line-y${cnt}`);
      line.setAttribute('x1', '0');
      line.setAttribute('y1', y);
      line.setAttribute('x2', widthStr);
      line.setAttribute('y2', y);
    });
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

