/**
 * model.ts
 * データ管理・状態保持。
 * 旧: src/js/mvc/model.js
 *
 * 変更点:
 * - export default class → export class TypegridModel（名前付きクラス）
 * - 全プロパティ・メソッドに型を付与
 * - デバッグ用 console.log を削除
 * - currentMedia プロパティを追加（listenMediaQueries がセットする）
 */

import * as utils from './utils.js';
import * as config from './config.js';
import type { TypegridConfig, DeviceSnapshot, DebugState } from './types/typegrid.d.ts';

export class TypegridModel {
  // config から引いた設定値
  readonly debug: DebugState;
  readonly lib: typeof config.lib;
  readonly consoleCss: typeof config.consoleCss;
  readonly attr: typeof config.attr;
  readonly aria: typeof config.aria;
  readonly style: typeof config.style;
  readonly sizes: typeof config.sizes;
  readonly num: typeof config.num;
  readonly color: typeof config.color;
  readonly elem: typeof config.elem;
  /** view が styleBase を参照するための config オブジェクト */
  readonly config: { styleBase: string };

  // JSON由来の設定
  readonly user: TypegridConfig;
  readonly devices: string[];
  readonly fontSize: (number | 'computed')[];
  readonly visibility: boolean;
  readonly fixed: boolean;

  /** スクロールバーの幅（px） */
  readonly scrollbarWidth: number;

  /**
   * 現在マッチしているデバイスのスナップショット。
   * listenMediaQueries がセットする。
   */
  currentMedia: DeviceSnapshot | null = null;

  constructor(userConfig: TypegridConfig) {
    this.debug       = config.debug;
    this.lib         = config.lib;
    this.consoleCss  = config.consoleCss;
    this.attr        = config.attr;
    this.aria        = config.aria;
    this.style       = config.style;
    this.sizes       = config.sizes;
    this.num         = config.num;
    this.color       = config.color;
    this.elem        = config.elem;
    this.config      = { styleBase: config.styleBase };

    this.user        = userConfig;
    this.devices     = userConfig.media.devices;
    this.fontSize    = userConfig.media.contents.fontSize;
    this.visibility  = userConfig.general.visibility;
    this.fixed       = userConfig.general.fixed;

    this.scrollbarWidth = utils.calcScrollbarWidth();

    this.width();
    this.height();
    this.ua();
    this.keyboard();
    this.size();
    this.getStyle();
  }

  /**
   * 指定インデックスのデバイス設定スナップショットを返す。
   * view がリサイズ・メディア切替時に呼び出す。
   */
  getJsonValues(myIndex: number): DeviceSnapshot {
    const myMedia = this.user.media;
    const deviceCount = myMedia.devices.length;
    if (myIndex < 0 || myIndex >= deviceCount) {
      throw new RangeError(`[typegrid] getJsonValues: index ${myIndex} is out of range (0–${deviceCount - 1})`);
    }
    return {
      devices: myMedia.devices[myIndex]!,
      contents: {
        writingMode:   myMedia.contents.writingMode[myIndex]!,
        fontSize:      myMedia.contents.fontSize[myIndex]!,
        lineHeight:    myMedia.contents.lineHeight[myIndex]!,
        letterSpacing: myMedia.contents.letterSpacing[myIndex]!,
        breakPoints: {
          width: {
            min: myMedia.contents.breakPoints.width.min[myIndex]!,
          },
        },
        gutter: myMedia.contents.gutter[myIndex]!,
      },
      grids: {
        base: {
          num:    myMedia.grids.base.num[myIndex]!,
          gutter: myMedia.grids.base.gutter[myIndex]!,
        },
        column: {
          num:      myMedia.grids.column.num[myIndex]!,
          sizeChar: myMedia.grids.column.sizeChar[myIndex]!,
          gutter:   myMedia.grids.column.gutter[myIndex]!,
        },
        row: {
          height: myMedia.grids.row.height[myIndex]!,
          gutter: myMedia.grids.row.gutter[myIndex]!,
        },
        unit: {
          num:    myMedia.grids.unit.num[myIndex]!,
          gutter: myMedia.grids.unit.gutter[myIndex]!,
        },
      },
    };
  }

  width(): number {
    const isScrollbarOccur = utils.checkBrowserHeight();
    const widthOrigin = utils.width();
    if (isScrollbarOccur) {
      return widthOrigin - this.scrollbarWidth;
    }
    return widthOrigin;
  }

  height(): number {
    return utils.height();
  }

  wrapperHeight(): void {
    utils.setWrapperHeight();
  }

  ua(): void {
    utils.ua();
  }

  /** スタブ（未実装） */
  base(): void {
    // TODO: 実装予定
  }

  /** スタブ（未実装） */
  unit(): void {
    // TODO: 実装予定
  }

  /** スタブ（未実装） */
  layout(): void {
    // TODO: 実装予定
  }

  row(): void {
    // TODO: 実装予定
  }

  rhythm(): void {
    // TODO: 実装予定
  }

  /** スタブ（未実装） */
  ruler(): void {
    // TODO: 実装予定
  }

  /** スタブ（未実装） */
  guide(): void {
    // TODO: 実装予定
  }

  /** スタブ（未実装） */
  gui(): void {
    // TODO: 実装予定
  }

  keyboard(): void {
    // TODO: 実装予定
  }

  size(): void {
    // TODO: 実装予定
  }

  getStyle(): void {
    utils.getStyles('html');
  }
}
