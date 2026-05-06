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
 * - view を Renderer インターフェースに抽象化し、Canvas をデフォルトレンダラーとして採用
 */

import * as utils from './utils.js';
import { TypegridCanvasRenderer } from './renderer/canvas.js';
import { TypegridView }          from './view.js';
import { tryInitGui, type GuiConstructor, type TypegridGui } from './gui.js';
import type { TypegridModel }  from './model.js';
import type { Renderer, RendererMode } from './renderer/types.js';

export class TypegridController {
  private readonly utils:          typeof utils;
  private readonly model:          TypegridModel;
  private readonly guiConstructor: GuiConstructor | undefined;
  private readonly rendererRef:    { current: Renderer };
  private activeRenderer:          Renderer;

  /** リスナー解除関数（destroy 時に呼び出す） */
  private readonly unlistenMedia: () => void;
  private readonly uncheckWindow: () => void;
  // keyBinds は tg_all がDOMに追加された後に登録するため、noop で初期化して init 内で上書きする
  private unKeyBinds: () => void = () => {};
  private gui: TypegridGui | null = null;

  constructor(utilsModule: typeof utils, model: TypegridModel, guiConstructor?: GuiConstructor) {
    this.utils          = utilsModule;
    this.model          = model;
    this.guiConstructor = guiConstructor;

    this.activeRenderer = new TypegridCanvasRenderer(model);
    this.rendererRef    = { current: this.activeRenderer };

    this.unlistenMedia = this.setupMedia();
    this.uncheckWindow = this.setupResize();
    this.init();
  }

  /** DOMContentLoaded または即時に activeRenderer.init() を呼ぶ */
  private init(): void {
    const callback = (): void => {
      this.activeRenderer.init();
      this.unKeyBinds = this.utils.keyBinds(this.model);
      this.gui = tryInitGui(
        this.model,
        this.rendererRef,
        (mode) => { this.setRenderer(mode); },
        this.guiConstructor,
      );
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  /**
   * メディアクエリのリスナーを登録する。
   * @returns リスナー解除関数
   */
  private setupMedia(): () => void {
    const renderMedia = (mediaIndex: number): void => {
      this.activeRenderer.mediaChange(mediaIndex);
      this.gui?.updateMedia(mediaIndex);
    };
    return this.utils.listenMediaQueries(this.model, renderMedia);
  }

  /**
   * window resize リスナーを登録する。
   * @returns リスナー解除関数
   */
  private setupResize(): () => void {
    const renderResize = (): void => {
      this.activeRenderer.resize();
    };
    return this.utils.checkWindowSize(this.model, renderResize);
  }

  /** レンダラーを切り替える。既存レンダラーを破棄してから新しいレンダラーを初期化する */
  setRenderer(mode: RendererMode): void {
    this.activeRenderer.destroy();
    const next: Renderer = mode === 'canvas'
      ? new TypegridCanvasRenderer(this.model)
      : new TypegridView(this.utils, this.model);
    next.init();
    this.activeRenderer      = next;
    this.rendererRef.current = next;
  }

  /**
   * 登録済みのすべてのリスナーを解除する。
   * アンマウント時に呼び出す。
   */
  destroy(): void {
    this.unlistenMedia();
    this.uncheckWindow();
    this.unKeyBinds();
    this.gui?.destroy();
    this.activeRenderer.destroy();
  }
}
