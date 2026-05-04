/**
 * user.ts
 * typegrid.json を fetch で取得する。
 * 旧: src/js/modules/user.js
 */

import { tgFilePathOrigin } from './snippet.js';
import { lib, msg } from './config.js';
import type { TypegridConfig } from './types/typegrid.d.ts';
import { assertConfig } from './validate.js';

/**
 * typegrid.json を取得して successCallback に渡す。
 * スクリプトのURLを基点にJSONのパスを解決する。
 *
 * @param successCallback - JSON取得成功時に呼ばれるコールバック
 * @param signal - fetch をキャンセルするための AbortSignal（任意）
 */
export async function getJSON(
  successCallback: (json: TypegridConfig) => void,
  signal?: AbortSignal,
): Promise<void> {
  const origin = tgFilePathOrigin();
  // 本番ビルド: スクリプトURLから "typegrid.js" を取り除いてJSONパスを解決
  // 開発サーバー(Vite ESM): currentScript.src が typegrid.js を含まないため / にフォールバック
  const basePath = origin.includes('typegrid.js')
    ? origin.replace(/typegrid\.js$/g, '')
    : '/';
  const jsonPath = basePath + lib.json.file;

  try {
    const response = await fetch(jsonPath, { signal });
    if (!response.ok) throw new Error(msg.get.notfound);
    const json: unknown = await response.json();
    if (!assertConfig(json)) return;
    successCallback(json);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return;
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[${lib.name}] Failed to load typegrid.json:`, message);
  }
}
