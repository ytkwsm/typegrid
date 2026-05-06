/**
 * main.ts
 * typegrid.js エントリポイント。
 * 旧: src/js/main.js
 *
 * 変更点:
 * - window.__typegrid = new App() によるグローバル汚染を廃止
 * - named export に変更（import { typegrid } from 'typegrid.js' で利用可能）
 * - TypegridModel のコンストラクタを userConfig を受け取る形に変更したため、
 *   JSON取得後に model を生成するフローを維持
 * - TypegridView の直接生成を廃止し、Controller がレンダラーを管理する構造に変更
 */

import * as utils  from './utils.js';
import { getJSON } from './user.js';
import { TypegridModel }      from './model.js';
import { TypegridController } from './controller.js';
import type { GuiConstructor } from './gui.js';
import type { TypegridConfig } from './types/typegrid.d.ts';
import type { RendererMode } from './renderer/types.js';

/** typegrid のパブリックAPI */
export interface TypegridAPI {
  init: () => void;
  destroy: () => void;
  setRenderer: (mode: RendererMode) => void;
}

/**
 * typegrid の初期化オプション。
 *
 * `gui` — lil-gui のコンストラクタを渡すと GUI パネルが有効になる。
 * CDN script タグで lil-gui を読み込んでいる場合は指定不要（window.lil.GUI を自動検出）。
 *
 * 使用例（JS import）:
 * ```js
 * import { GUI } from 'lil-gui';
 * import { typegrid } from './typegrid.js';
 * typegrid({ gui: GUI });
 * ```
 */
export interface TypegridOptions {
  gui?: GuiConstructor;
}

/**
 * typegrid を初期化してAPIオブジェクトを返す。
 * typegrid.json の読み込みが完了してから MVC を構築する。
 *
 * 使用例:
 * ```html
 * <script type="module">
 *   import { typegrid } from './dist/typegrid.js';
 *   typegrid();
 * </script>
 * ```
 */
export function typegrid(options?: TypegridOptions): TypegridAPI {
  let controller: TypegridController | null = null;
  let fetchAbort: AbortController | null = null;

  const api: TypegridAPI = {
    init() {
      fetchAbort = new AbortController();
      getJSON((json: TypegridConfig) => {
        fetchAbort = null;
        const model = new TypegridModel(json);
        controller  = new TypegridController(utils, model, options?.gui);
      }, fetchAbort.signal);
    },
    destroy() {
      fetchAbort?.abort();
      fetchAbort = null;
      if (controller) {
        controller.destroy();
        controller = null;
      }
    },
    setRenderer(mode) {
      controller?.setRenderer(mode);
    },
  };

  api.init();
  return api;
}
