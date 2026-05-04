import { describe, it, expect } from 'vitest';
import { TypegridModel } from './model.js';
import type { TypegridConfig } from './types/typegrid.d.ts';

const makeConfig = (deviceCount = 2): TypegridConfig => ({
  general: {
    visibility: true,
    fixed: true,
    deviceDecision: '@media',
    unit: { breakPoints: 'px' },
  },
  media: {
    devices: Array.from({ length: deviceCount }, (_, i) => `device${i}`),
    contents: {
      writingMode:   Array(deviceCount).fill('horizontal-tb'),
      fontSize:      Array(deviceCount).fill(16),
      lineHeight:    Array(deviceCount).fill(1.5),
      letterSpacing: Array(deviceCount).fill(0),
      breakPoints: { width: { min: Array.from({ length: deviceCount }, (_, i) => i * 768) } },
      gutter:        Array(deviceCount).fill('auto'),
    },
    grids: {
      base:   { num: Array(deviceCount).fill(4), gutter: Array(deviceCount).fill(1) },
      column: { num: Array(deviceCount).fill(4), sizeChar: Array(deviceCount).fill('fluid'), gutter: Array(deviceCount).fill(1) },
      row:    { height: Array(deviceCount).fill(1), gutter: Array(deviceCount).fill(0.5) },
      unit:   { num: Array(deviceCount).fill(4), gutter: Array(deviceCount).fill(1) },
    },
  },
});

describe('TypegridModel.getJsonValues', () => {
  it('有効なインデックスでスナップショットを返す', () => {
    const model = new TypegridModel(makeConfig(3));
    const snapshot = model.getJsonValues(0);
    expect(snapshot.devices).toBe('device0');
    expect(snapshot.contents.fontSize).toBe(16);
  });

  it('最大インデックスでも取得できる', () => {
    const model = new TypegridModel(makeConfig(3));
    const snapshot = model.getJsonValues(2);
    expect(snapshot.devices).toBe('device2');
  });

  it('範囲外（負）は RangeError を投げる', () => {
    const model = new TypegridModel(makeConfig(2));
    expect(() => model.getJsonValues(-1)).toThrow(RangeError);
  });

  it('範囲外（上限超過）は RangeError を投げる', () => {
    const model = new TypegridModel(makeConfig(2));
    expect(() => model.getJsonValues(2)).toThrow(RangeError);
  });

  it('RangeError のメッセージにインデックス情報が含まれる', () => {
    const model = new TypegridModel(makeConfig(2));
    expect(() => model.getJsonValues(5)).toThrow(/5/);
  });
});
