import type { DeviceSnapshot } from '../types/typegrid.d.ts';

export interface Renderer {
  currentMedia: DeviceSnapshot | null;
  init(): void;
  resize(): void;
  mediaChange(index: number): void;
  invalidateMediaCalc(): void;
  destroy(): void;
}

export type RendererMode = 'canvas' | 'svg';
