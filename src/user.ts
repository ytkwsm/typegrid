/**
 * user.ts
 * typegrid.json を fetch で取得する。
 * 旧: src/js/modules/user.js
 */

import { tgFilePathOrigin } from './snippet.js';
import { lib, msg } from './config.js';
import type { TypegridConfig } from './types/typegrid.d.ts';

/**
 * typegrid.json を取得して successCallback に渡す。
 * スクリプトのURLを基点にJSONのパスを解決する。
 *
 * @param successCallback - JSON取得成功時に呼ばれるコールバック
 */
export function getJSON(successCallback: (json: TypegridConfig) => void): void {
  const origin = tgFilePathOrigin();
  // 本番ビルド: スクリプトURLから "typegrid.js" を取り除いてJSONパスを解決
  // 開発サーバー(Vite ESM): currentScript.src が typegrid.js を含まないため / にフォールバック
  const basePath = origin.includes('typegrid.js')
    ? origin.replace(/typegrid\.js$/g, '')
    : '/';
  const jsonPath = basePath + lib.json.file;

  fetch(jsonPath)
    .then((response) => {
      if (response.ok) {
        return response.json() as Promise<TypegridConfig>;
      }
      throw new Error(msg.get.notfound);
    })
    .then(successCallback)
    .catch((error: unknown) => {
      if (error instanceof Error) {
        console.error(`[${lib.name}] Failed to load typegrid.json:`, error.message);
      } else {
        console.error(`[${lib.name}] Failed to load typegrid.json:`, error);
      }
    });
}
