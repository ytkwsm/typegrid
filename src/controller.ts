/**
 * controller.ts
 * イベント統括・MVCの橋渡し。
 * 旧: src/js/mvc/controller.js
 *
 * 変更点:
 * - export default class → export class TypegridController（名前付きクラス）
 * - listenMediaQueries / checkWindowSize の戻り値（解除関数）を保持するよう変更
 * - destroy() メソッドで登録済みリスナーをまとめて解除できるよう整理
 * - デバッグ用 console.log を削除
 */

import * as utils from './utils.js';
import type { TypegridModel } from './model.js';
import type { TypegridView } from './view.js';

export class TypegridController {
  private readonly utils: typeof utils;
  private readonly model: TypegridModel;
  private readonly view: TypegridView;

  /** リスナー解除関数（destroy 時に呼び出す） */
  private readonly unlistenMedia: () => void;
  private readonly uncheckWindow: () => void;
  private readonly unKeyBinds: () => void;

  constructor(utilsModule: typeof utils, model: TypegridModel, view: TypegridView) {
    this.utils = utilsModule;
    this.model = model;
    this.view  = view;

    this.unlistenMedia = this.media();
    this.uncheckWindow = this.resize();
    this.unKeyBinds    = this.keyBinds();
    this.init();
  }

  /** DOMContentLoaded または即時に view.render('init') を呼ぶ */
  private init(): void {
    const callback = (): void => {
      this.view.render('init');
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  /**
   * メディアクエリのリスナーを登録する。
   * @returns リスナー解除関数
   */
  private media(): () => void {
    const renderMedia = (mediaIndex: number): void => {
      this.view.render('media', mediaIndex);
    };
    return this.utils.listenMediaQueries(this.model, this.view, renderMedia);
  }

  /**
   * window resize リスナーを登録する。
   * @returns リスナー解除関数
   */
  private resize(): () => void {
    const renderResize = (): void => {
      this.view.render('resize');
    };
    return this.utils.checkWindowSize(this.model, this.view, renderResize);
  }

  private keyBinds(): () => void {
    return this.utils.keyBinds(this.model, this.view);
  }

  /**
   * 登録済みのすべてのリスナーを解除する。
   * アンマウント時に呼び出す。
   */
  destroy(): void {
    this.unlistenMedia();
    this.uncheckWindow();
    this.unKeyBinds();
  }
}
