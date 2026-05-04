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
 */

import * as utils  from './utils.js';
import { getJSON } from './user.js';
import { TypegridModel }      from './model.js';
import { TypegridView }       from './view.js';
import { TypegridController } from './controller.js';
import type { TypegridConfig } from './types/typegrid.d.ts';

/** typegrid のパブリックAPI */
export interface TypegridAPI {
  init: () => void;
  destroy: () => void;
}

/**
 * typegrid を初期化してAPIオブジェクトを返す。
 * typegrid.json の読み込みが完了してから MVC を構築する。
 *
 * 使用例:
 * ```html
 * <script type="module">
 *   import { typegrid } from './dist/typegrid.js';
 *   const tg = typegrid();
 * </script>
 * ```
 */
export function typegrid(): TypegridAPI {
  let controller: TypegridController | null = null;

  const api: TypegridAPI = {
    init() {
      getJSON((json: TypegridConfig) => {
        const model = new TypegridModel(json);
        const view  = new TypegridView(utils, model);
        controller  = new TypegridController(utils, model, view);
      });
    },
    destroy() {
      if (controller) {
        controller.destroy();
        controller = null;
      }
    },
  };

  api.init();
  return api;
}
