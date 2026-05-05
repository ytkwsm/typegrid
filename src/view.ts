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
import {
  type MediaCalcCache,
  type ColumnRect,
  type RowRect,
  type RhythmLine,
  buildMediaCalcCache,
  computeGridLayout,
} from './core/calc.js';

type RenderMode = 'init' | 'resize' | 'change' | 'media';

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
   * isNew=false（既存要素）は変化する属性のみ更新し、静的属性の setAttribute を省略する。
   * isNew=true（新規要素）は全属性を設定する。
   */
  private syncSvgElements<T extends SVGElement>(
    container: Element,
    count: number,
    tagName: string,
    setAttrs: (el: T, i: number, isNew: boolean) => void,
  ): void {
    const children = container.children;
    const existing = Math.min(children.length, count);

    for (let i = 0; i < existing; i++) {
      setAttrs(children[i] as T, i, false);
    }

    const frag = document.createDocumentFragment();
    for (let i = children.length; i < count; i++) {
      const el = document.createElementNS(SVG_NS, tagName) as T;
      setAttrs(el, i, true);
      frag.appendChild(el);
    }
    if (frag.childNodes.length > 0) container.appendChild(frag);

    let excess = container.children.length - count;
    while (excess-- > 0) {
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
        this.cachedMediaCalc = buildMediaCalcCache(this.currentMedia, this.cachedFontSize);
      }
      const calc         = this.cachedMediaCalc;
      const renderWidth  = this.model.width();
      const renderHeight = this.utils.height();
      this.model.wrapperHeight(renderHeight);
      this.utils.setSvgSizes(this.elSvgGrid, renderWidth, renderHeight);
      const gridLayout = computeGridLayout(calc, renderWidth, renderHeight);
      this.rhythm(gridLayout.rhythmLines);
      this.row(gridLayout.rows);
      this.layout(gridLayout.columns);
      this.base();
      this.unit();
    } else if (flg === 'change') {
      this.unit();
    } else if (flg === 'media') {
      if (param1 === undefined) return;
      this.currentMedia = this.model.getJsonValues(param1);
      this.cachedFontSize  = null;
      this.cachedMediaCalc = null;
      // コンテナをリセットして次の resize でフル再描画（isNew=true）する
      this.elLayoutBody?.replaceChildren();
      this.elRowBody?.replaceChildren();
      this.elRhythmBody?.replaceChildren();
    }
  }

  base(): void {
    // TODO: 実装予定
  }

  unit(): void {
    // TODO: 実装予定
  }

  private layout(columns: ColumnRect[]): void {
    const targetInsert = this.elLayoutBody;
    if (!targetInsert) return;

    this.syncSvgElements<SVGRectElement>(targetInsert, columns.length, 'rect', (rect, i, isNew) => {
      const col = columns[i]!;
      if (isNew) {
        rect.setAttribute('class', `rect-x${i}`);
        rect.setAttribute('y', '0');
      }
      rect.setAttribute('x', String(col.x));
      rect.setAttribute('width', String(col.width));
      rect.setAttribute('height', String(col.height));
    });
  }

  private row(rows: RowRect[]): void {
    const targetInsert = this.elRowBody;
    if (!targetInsert) return;

    this.syncSvgElements<SVGRectElement>(targetInsert, rows.length, 'rect', (rect, i, isNew) => {
      const r = rows[i]!;
      if (isNew) {
        rect.setAttribute('class', `row-y${i}`);
        rect.setAttribute('x', '0');
        rect.setAttribute('y', String(r.y));
        rect.setAttribute('height', String(r.height));
      }
      rect.setAttribute('width', String(r.width));
    });
  }

  private rhythm(lines: RhythmLine[]): void {
    const targetInsert = this.elRhythmBody;
    if (!targetInsert) return;

    this.syncSvgElements<SVGLineElement>(targetInsert, lines.length, 'line', (line, i, isNew) => {
      const l = lines[i]!;
      if (isNew) {
        line.setAttribute('class', `line-y${i}`);
        line.setAttribute('x1', '0');
        line.setAttribute('y1', String(l.y1));
        line.setAttribute('y2', String(l.y2));
      }
      line.setAttribute('x2', String(l.x2));
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

