import { describe, it, expect, beforeEach } from 'vitest';
import {
  convertHex,
  decisionGutterSideType,
  decisionColumnSizeType,
  buildMediaQueries,
  reset,
} from './utils.js';

describe('convertHex', () => {
  it('rgb() を hex に変換する', () => {
    expect(convertHex('rgb(255, 0, 0)')).toBe('ff0000');
    expect(convertHex('rgb(0, 128, 255)')).toBe('0080ff');
    expect(convertHex('rgb(0, 0, 0)')).toBe('000000');
    expect(convertHex('rgb(255, 255, 255)')).toBe('ffffff');
  });

  it('rgba() を hex に変換する（アルファは無視）', () => {
    expect(convertHex('rgba(255, 0, 0, 0.5)')).toBe('ff0000');
  });

  it('不正な文字列は空文字を返す', () => {
    expect(convertHex('not-a-color')).toBe('');
    expect(convertHex('')).toBe('');
  });
});

describe('decisionGutterSideType', () => {
  it('"auto" のとき 0 を返す', () => {
    expect(decisionGutterSideType('auto', 16)).toBe(0);
  });

  it('数値のとき fontSize との積を返す', () => {
    expect(decisionGutterSideType(2, 16)).toBe(32);
    expect(decisionGutterSideType(1.5, 20)).toBe(30);
  });
});

describe('decisionColumnSizeType', () => {
  it('"fluid" のとき利用可能幅を等分割する', () => {
    // width=1200, gutterTotal=60 (利用可能幅1140), columnNum=12, gutterSideEach=0
    // 各カラム = 1140 / 12 - 0 = 95
    const result = decisionColumnSizeType(16, 'fluid', 1200, 12, 60, 0);
    expect(result).toBeCloseTo(95);
  });

  it('数値のとき文字数換算の固定幅を返す', () => {
    // fontSize=16, sizeChar=4 → 16 * 4 - 0 = 64
    const result = decisionColumnSizeType(16, 4, 1200, 12, 60, 0);
    expect(result).toBeCloseTo(64);
  });

  it('gutterSideEachInstallments を差し引く', () => {
    const result = decisionColumnSizeType(16, 'fluid', 1200, 12, 60, 5);
    expect(result).toBeCloseTo(90); // 95 - 5
  });
});

describe('buildMediaQueries', () => {
  const devices = ['mobile', 'tablet', 'desktop'];
  const breakPoints = [0, 768, 1200];

  it('最小インデックスは max-width のみ', () => {
    const queries = buildMediaQueries(devices, breakPoints, 'px');
    expect(queries[0]).toBe('screen and (max-width: 767px)');
  });

  it('最大インデックスは min-width のみ', () => {
    const queries = buildMediaQueries(devices, breakPoints, 'px');
    expect(queries[2]).toBe('screen and (min-width: 1200px)');
  });

  it('中間インデックスは min-width と max-width の両方', () => {
    const queries = buildMediaQueries(devices, breakPoints, 'px');
    expect(queries[1]).toBe('screen and (min-width: 768px) and (max-width: 1199px)');
  });

  it('単位に em を使える', () => {
    const queries = buildMediaQueries(devices, breakPoints, 'em');
    expect(queries[2]).toBe('screen and (min-width: 1200em)');
  });
});

describe('reset (DOM)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('子要素を全て削除する', () => {
    const el = document.createElement('div');
    el.innerHTML = '<span>a</span><span>b</span>';
    document.body.appendChild(el);
    reset(el);
    expect(el.children.length).toBe(0);
  });

  it('既に空の要素には何もしない', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    expect(() => reset(el)).not.toThrow();
  });
});
