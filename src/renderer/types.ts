import type { DeviceSnapshot } from '../types/typegrid.d.ts';

export interface Renderer {
  currentMedia: DeviceSnapshot | null;
  init(): void;
  resize(): void;
  mediaChange(index: number): void;
  invalidateMediaCalc(): void;
  destroy(): void;
  exportSvg(): string | null;
  exportPng(): Promise<Blob | null>;
}

export type RendererMode = 'canvas' | 'svg';
