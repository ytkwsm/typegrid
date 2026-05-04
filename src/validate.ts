/**
 * validate.ts
 * typegrid.json の構造を実行時に検証するバリデーター。
 * 設定ミスを早期にコンソール警告として通知する。
 */

import type { TypegridConfig } from './types/typegrid.d.ts';

type ValidationResult = { ok: true } | { ok: false; errors: string[] };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function isArrayOf<T>(
  v: unknown,
  check: (item: unknown) => item is T,
  minLength = 1,
): v is T[] {
  return Array.isArray(v) && v.length >= minLength && v.every(check);
}

const isString  = (v: unknown): v is string  => typeof v === 'string';
const isBoolean = (v: unknown): v is boolean => typeof v === 'boolean';
const isNumber  = (v: unknown): v is number  => typeof v === 'number' && isFinite(v);
const isNumberOrComputed = (v: unknown): v is number | 'computed' =>
  isNumber(v) || v === 'computed';
const isNumberOrAuto = (v: unknown): v is number | 'auto' =>
  isNumber(v) || v === 'auto';
const isFluidOrNumber = (v: unknown): v is 'fluid' | number =>
  v === 'fluid' || isNumber(v);

/**
 * typegrid.json の構造を検証する。
 * @returns 検証結果。ok が false の場合は errors にメッセージの配列が入る。
 */
export function validateConfig(config: unknown): ValidationResult {
  const errors: string[] = [];

  if (!isObject(config)) {
    return { ok: false, errors: ['config はオブジェクトである必要があります'] };
  }

  // general
  const general = config['general'];
  if (!isObject(general)) {
    errors.push('general が存在しないか不正な型です');
  } else {
    if (!isBoolean(general['visibility'])) errors.push('general.visibility は boolean が必要です');
    if (!isBoolean(general['fixed']))      errors.push('general.fixed は boolean が必要です');
    if (!isString(general['deviceDecision'])) errors.push('general.deviceDecision は string が必要です');
    const unit = general['unit'];
    if (!isObject(unit) || !isString(unit['breakPoints'])) {
      errors.push('general.unit.breakPoints は string が必要です');
    }
  }

  // media
  const media = config['media'];
  if (!isObject(media)) {
    errors.push('media が存在しないか不正な型です');
    return { ok: false, errors };
  }

  const devices = media['devices'];
  if (!isArrayOf(devices, isString)) {
    errors.push('media.devices は string[] (1件以上) が必要です');
    return { ok: false, errors };
  }
  const n = devices.length;

  // 各配列の長さを devices と揃える汎用チェック
  const checkArray = <T>(
    path: string,
    value: unknown,
    guard: (v: unknown) => v is T,
  ): void => {
    if (!isArrayOf(value, guard) || value.length !== n) {
      errors.push(`${path} は長さ ${n} の配列が必要です`);
    }
  };

  const contents = media['contents'];
  if (!isObject(contents)) {
    errors.push('media.contents が存在しないか不正な型です');
  } else {
    checkArray('media.contents.writingMode',   contents['writingMode'],   isString);
    checkArray('media.contents.fontSize',      contents['fontSize'],      isNumberOrComputed);
    checkArray('media.contents.lineHeight',    contents['lineHeight'],    isNumber);
    checkArray('media.contents.letterSpacing', contents['letterSpacing'], isNumber);
    checkArray('media.contents.gutter',        contents['gutter'],        isNumberOrAuto);
    const bp = contents['breakPoints'];
    if (!isObject(bp) || !isObject(bp['width'])) {
      errors.push('media.contents.breakPoints.width が存在しないか不正な型です');
    } else {
      checkArray('media.contents.breakPoints.width.min', bp['width']['min'], isNumber);
    }
  }

  const grids = media['grids'];
  if (!isObject(grids)) {
    errors.push('media.grids が存在しないか不正な型です');
  } else {
    const checkGrid = (name: string, extra?: Record<string, (v: unknown) => boolean>): void => {
      const g = grids[name];
      if (!isObject(g)) { errors.push(`media.grids.${name} が存在しないか不正な型です`); return; }
      checkArray(`media.grids.${name}.num`,    g['num'],    isNumber);
      checkArray(`media.grids.${name}.gutter`, g['gutter'], isNumber);
      if (extra) {
        for (const [key, guard] of Object.entries(extra)) {
          checkArray(`media.grids.${name}.${key}`, g[key], guard as (v: unknown) => v is unknown);
        }
      }
    };
    checkGrid('base');
    checkGrid('column', { sizeChar: isFluidOrNumber });
    checkGrid('row',    { height: isNumber });
    checkGrid('unit');
  }

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}

/**
 * 検証を実行し、エラーがあればコンソールに警告を出力する。
 * 致命的ではない場合も続行できるよう、例外は投げない。
 */
export function assertConfig(config: unknown): config is TypegridConfig {
  const result = validateConfig(config);
  if (!result.ok) {
    console.warn('[typegrid] typegrid.json の設定に問題があります:');
    result.errors.forEach(e => console.warn(`  - ${e}`));
    return false;
  }
  return true;
}
