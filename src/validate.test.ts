import { describe, it, expect } from 'vitest';
import { validateConfig } from './validate.js';

const validConfig = {
  general: {
    visibility: true,
    fixed: true,
    deviceDecision: '@media',
    unit: { breakPoints: 'px' },
  },
  media: {
    devices: ['mobile', 'desktop'],
    contents: {
      writingMode:   ['horizontal-tb', 'horizontal-tb'],
      fontSize:      [16, 16],
      lineHeight:    [1.5, 1.5],
      letterSpacing: [0, 0],
      breakPoints: { width: { min: [0, 768] } },
      gutter:        ['auto', 1],
    },
    grids: {
      base:   { num: [4, 12], gutter: [1, 1] },
      column: { num: [4, 12], sizeChar: ['fluid', 'fluid'], gutter: [1, 1] },
      row:    { height: [1, 1], gutter: [0.5, 0.5] },
      unit:   { num: [4, 12], gutter: [1, 1] },
    },
  },
};

describe('validateConfig', () => {
  it('有効な設定を通過させる', () => {
    expect(validateConfig(validConfig).ok).toBe(true);
  });

  it('config がオブジェクトでない場合はエラー', () => {
    const result = validateConfig(null);
    expect(result.ok).toBe(false);
  });

  it('general がない場合はエラー', () => {
    const config = { ...validConfig, general: undefined };
    const result = validateConfig(config);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.some(e => e.includes('general'))).toBe(true);
  });

  it('general.visibility が boolean でない場合はエラー', () => {
    const config = { ...validConfig, general: { ...validConfig.general, visibility: 'yes' } };
    const result = validateConfig(config);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.some(e => e.includes('visibility'))).toBe(true);
  });

  it('media.devices が空配列の場合はエラー', () => {
    const config = {
      ...validConfig,
      media: { ...validConfig.media, devices: [] },
    };
    const result = validateConfig(config);
    expect(result.ok).toBe(false);
  });

  it('配列の長さが devices と一致しない場合はエラー', () => {
    const config = {
      ...validConfig,
      media: {
        ...validConfig.media,
        contents: {
          ...validConfig.media.contents,
          fontSize: [16], // devices.length=2 なのに長さ1
        },
      },
    };
    const result = validateConfig(config);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.some(e => e.includes('fontSize'))).toBe(true);
  });

  it('fontSize に "computed" を使える', () => {
    const config = {
      ...validConfig,
      media: {
        ...validConfig.media,
        contents: { ...validConfig.media.contents, fontSize: ['computed', 16] },
      },
    };
    expect(validateConfig(config).ok).toBe(true);
  });

  it('column.sizeChar に "fluid" を使える', () => {
    expect(validateConfig(validConfig).ok).toBe(true);
  });

  it('media.grids がない場合はエラー', () => {
    const { grids: _, ...mediaWithoutGrids } = validConfig.media;
    const config = { ...validConfig, media: mediaWithoutGrids };
    const result = validateConfig(config);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.some(e => e.includes('grids'))).toBe(true);
  });
});
