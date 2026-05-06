/**
 * gui.ts
 * lil-gui との連携。typegrid の設定をリアルタイムで調整する GUI パネルを提供する。
 *
 * lil-gui は typegrid のバンドルに含まれない。以下どちらかの方法で使用する。
 *
 * 方法A — CDN script タグ（追加コードなし）:
 *   <script src="https://cdn.jsdelivr.net/npm/lil-gui@0.20"></script>
 *   window.lil.GUI を自動検出する。
 *
 * 方法B — JS import（明示的に渡す）:
 *   import { GUI } from 'lil-gui';
 *   typegrid({ gui: GUI });
 */

import type { TypegridModel } from './model.js';
import type { Renderer, RendererMode } from './renderer/types.js';
import type { TypegridConfig } from './types/typegrid.d.ts';
import { triggerDownload } from './renderer/download.js';

// lil-gui の最小限インターフェース（lil-gui を devDependencies に追加しない）
interface LilGuiController {
  min(v: number): this;
  max(v: number): this;
  step(v: number): this;
  name(label: string): this;
  onChange(fn: () => void): this;
  updateDisplay(): this;
}

interface LilGuiFolder {
  add(obj: object, key: string, ...rest: unknown[]): LilGuiController;
  addFolder(name: string): LilGuiFolder;
}

interface LilGuiInstance extends LilGuiFolder {
  destroy(): void;
  controllersRecursive(): LilGuiController[];
  domElement: HTMLElement;
}

/** lil-gui コンストラクタの型（JS import で渡す場合に指定する） */
export interface GuiConstructor {
  new(options?: { title?: string; width?: number }): LilGuiInstance;
}

declare global {
  interface Window {
    lil?: { GUI: GuiConstructor };
  }
}

interface GuiParams {
  fontSize: number;
  lineHeight: number;
  contentGutter: number;
  columnNum: number;
  columnGutter: number;
  rowHeight: number;
  rowGutter: number;
}

function resolveParams(model: TypegridModel, index: number): GuiParams {
  const m = model.user.media;
  const rawFontSize = m.contents.fontSize[index];
  const rawGutter   = m.contents.gutter[index];
  return {
    fontSize: rawFontSize === 'computed'
      ? parseFloat(getComputedStyle(document.documentElement).fontSize)
      : (rawFontSize ?? 16),
    lineHeight:    m.contents.lineHeight[index]  ?? 1.5,
    contentGutter: rawGutter === 'auto' ? 0 : (rawGutter ?? 0),
    columnNum:     m.grids.column.num[index]     ?? 4,
    columnGutter:  m.grids.column.gutter[index]  ?? 1,
    rowHeight:     m.grids.row.height[index]     ?? 4,
    rowGutter:     m.grids.row.gutter[index]     ?? 1,
  };
}

/** GUI の公開インターフェース。コントローラーが保持する */
export interface TypegridGui {
  /** メディアが切り替わったときに呼ぶ。表示値を新しいデバイスの設定に更新する */
  updateMedia(index: number): void;
  destroy(): void;
}

/**
 * lil-gui が使用可能なら GUI パネルを生成して返す。
 * いずれの方法でも lil-gui が存在しない場合は null を返す（GUI なしで通常動作する）。
 *
 * @param rendererRef - 現在アクティブなレンダラーへの参照（切替後も最新を指す）
 * @param onSetRenderer - レンダラートグル変更時のコールバック
 * @param guiConstructor - 方法B（JS import）で渡す GUI コンストラクタ。
 *                         省略時は window.lil.GUI（方法A）を自動検出する。
 */
export function tryInitGui(
  model: TypegridModel,
  rendererRef: { current: Renderer },
  onSetRenderer?: (mode: RendererMode) => void,
  guiConstructor?: GuiConstructor,
): TypegridGui | null {
  const GUI = guiConstructor ?? window.lil?.GUI;
  if (!GUI) return null;

  let currentIndex = model.currentMediaIndex;
  const params = resolveParams(model, currentIndex);

  const applyParams = (): void => {
    const renderer = rendererRef.current;
    if (!renderer.currentMedia) return;
    const cm = renderer.currentMedia;
    cm.contents.fontSize   = params.fontSize;
    cm.contents.lineHeight = params.lineHeight;
    cm.contents.gutter     = params.contentGutter;
    cm.grids.column.num    = params.columnNum;
    cm.grids.column.gutter = params.columnGutter;
    cm.grids.row.height    = params.rowHeight;
    cm.grids.row.gutter    = params.rowGutter;
    renderer.invalidateMediaCalc();
    renderer.resize();
  };

  const gui = new GUI({ title: 'typegrid' });
  gui.domElement.style.zIndex = '99901';

  const contentsFolder = gui.addFolder('Contents');
  const colFolder      = gui.addFolder('Column');
  const rowFolder      = gui.addFolder('Row');

  contentsFolder.add(params, 'fontSize').min(8).max(40).step(1).name('font-size (px)').onChange(applyParams);
  contentsFolder.add(params, 'lineHeight').min(1).max(3).step(0.025).name('line-height').onChange(applyParams);
  contentsFolder.add(params, 'contentGutter').min(0).max(20).step(0.25).name('side gutter (rem)').onChange(applyParams);

  colFolder.add(params, 'columnNum').min(1).max(24).step(1).name('columns').onChange(applyParams);
  colFolder.add(params, 'columnGutter').min(0).max(10).step(0.25).name('gutter (rem)').onChange(applyParams);

  rowFolder.add(params, 'rowHeight').min(1).max(20).step(0.125).name('height (rem)').onChange(applyParams);
  rowFolder.add(params, 'rowGutter').min(0).max(10).step(0.125).name('gutter (rem)').onChange(applyParams);

  const exportActions = {
    exportJson(): void {
      const config = JSON.parse(JSON.stringify(model.user)) as TypegridConfig;
      const idx = currentIndex;
      config.media.contents.fontSize[idx]   = params.fontSize;
      config.media.contents.lineHeight[idx] = params.lineHeight;
      config.media.contents.gutter[idx]     = params.contentGutter;
      config.media.grids.column.num[idx]    = params.columnNum;
      config.media.grids.column.gutter[idx] = params.columnGutter;
      config.media.grids.row.height[idx]    = params.rowHeight;
      config.media.grids.row.gutter[idx]    = params.rowGutter;

      const blob = new Blob([JSON.stringify(config, null, 4)], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = 'typegrid.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    exportSvg(): void {
      const svg = rendererRef.current.exportSvg();
      if (!svg) return;
      triggerDownload(new Blob([svg], { type: 'image/svg+xml' }), 'typegrid.svg');
    },
    async exportPng(): Promise<void> {
      const blob = await rendererRef.current.exportPng();
      if (!blob) return;
      triggerDownload(blob, 'typegrid.png');
    },
  };
  gui.add(exportActions, 'exportJson').name('Export JSON');
  gui.add(exportActions, 'exportSvg').name('Export SVG');
  gui.add(exportActions, 'exportPng').name('Export PNG');

  // レンダラー切替トグル（Canvas/SVG の切替）
  if (onSetRenderer) {
    const rendererToggle = { mode: 'canvas' as RendererMode };
    gui.add(rendererToggle, 'mode', ['canvas', 'svg'])
      .name('renderer')
      .onChange(() => { onSetRenderer(rendererToggle.mode); });
  }

  return {
    updateMedia(index: number): void {
      currentIndex = index;
      Object.assign(params, resolveParams(model, index));
      gui.controllersRecursive().forEach(c => c.updateDisplay());
    },
    destroy(): void {
      gui.destroy();
    },
  };
}
