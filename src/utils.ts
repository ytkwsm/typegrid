/**
 * utils.ts
 * DOM操作・イベント処理・計算処理の共通ユーティリティ。
 * 旧: src/js/modules/utils.js
 *
 * 変更点:
 * - matchMedia.addListener() → addEventListener('change', ...) に変更（非推奨API修正）
 * - this コンテキスト依存を排除。メディアクエリリスナーはクロージャで状態を保持する。
 * - デバッグ用 console.log を削除し、エラー・警告のみ残す。
 */

import type { TypegridConfig } from './types/typegrid.d.ts';
import type { TypegridModel } from './model.js';
import type { TypegridView } from './view.js';
import * as config from './config.js';

// -----------------------------------------------------------------------
// model 関連
// -----------------------------------------------------------------------

/**
 * config に保存された JSON を取得する。
 * 旧実装との互換のために残しているが、TypegridModel は直接 userConfig を受け取るため
 * 新規コードでの使用は非推奨。
 * @deprecated TypegridModel コンストラクタに TypegridConfig を直接渡すこと。
 */
export function getJSON(item: string): TypegridConfig | undefined {
  return (config as unknown as Record<string, TypegridConfig>)[item];
}

/** スクロールバーの幅（px）を計算して返す */
export function calcScrollbarWidth(): number {
  const element = document.createElement('div');
  element.style.visibility = 'hidden';
  element.style.overflow = 'scroll';
  document.body.appendChild(element);
  const scrollbarWidth = element.offsetWidth - element.clientWidth;
  document.body.removeChild(element);
  return scrollbarWidth;
}

/**
 * ドキュメントの縦幅がビューポートを超えているか（縦スクロールが発生しているか）を返す。
 */
export function checkBrowserHeight(): boolean {
  const viewportHeight = Math.max(window.innerHeight, document.documentElement.clientHeight);
  const documentHeight = Math.max(document.body.scrollHeight, document.body.clientHeight);
  return viewportHeight < documentHeight;
}

/** wrapper 要素の height をドキュメントの高さに合わせる */
export function setWrapperHeight(): void {
  const target = document.getElementById('tg_wrapper');
  if (!target) return;
  target.style.height = `${height()}px`;
}

/** ブラウザの横幅（px）を返す */
export function width(): number {
  return window.innerWidth || document.documentElement.clientWidth || 0;
}

/** ドキュメントの縦幅（px）を返す */
export function height(): number {
  return Math.max(
    window.innerHeight,
    document.documentElement.clientHeight,
    document.body.offsetHeight,
    document.body.clientHeight,
    document.body.scrollHeight,
  );
}

/** UserAgent を解析してコンソールに出力する（情報参照用） */
export function ua(): void {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('iPhone') > 0 || (userAgent.indexOf('Android') > 0 && userAgent.indexOf('Mobile') > 0)) {
    console.info('[typegrid] UA: mobile detected');
  } else if (userAgent.indexOf('iPad') > 0 || userAgent.indexOf('Android') > 0) {
    console.info('[typegrid] UA: tablet detected');
  } else {
    console.info('[typegrid] UA: desktop detected');
  }
}

/** 指定要素の computedStyle を返す */
export function getElementTagStyle(elem: 'html' | 'body'): CSSStyleDeclaration {
  const tag = document.getElementsByTagName(elem).item(0);
  if (!tag) {
    throw new Error(`[typegrid] Element <${elem}> not found.`);
  }
  return window.getComputedStyle(tag);
}

/** rgb/rgba 文字列を HEX 文字列に変換する */
export function convertHex(color: string): string {
  const match = /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),?\s*([.\d]+)?\)/.exec(color);
  if (!match) return '';
  return [1, 2, 3].map(i => Number(match[i]).toString(16).padStart(2, '0')).join('');
}

/**
 * JSON設定の fontSize が "computed" の場合は html 要素の実測値を返す。
 * 数値の場合はそのまま返す。
 */
export function convertComputedFontSize(jsonFontSize: number | 'computed', targetElem: 'html' | 'body'): number {
  if (jsonFontSize === 'computed') {
    const computedStyle = getElementTagStyle(targetElem);
    return parseFloat(computedStyle.fontSize);
  }
  return jsonFontSize;
}

/** html 要素のスタイルをコンソールに出力する（デバッグ用） */
export function getStyles(elem: 'html' | 'body'): void {
  const styles = getElementTagStyle(elem);
  console.info(
    `[typegrid] <${elem}> styles —`,
    `font-size: ${styles.fontSize};`,
    `line-height: ${styles.lineHeight};`,
    `color: #${convertHex(styles.color)};`,
  );
}

// -----------------------------------------------------------------------
// layout 計算
// -----------------------------------------------------------------------

/**
 * 両端ガターの種別を判定してピクセル値を返す。
 * "auto" の場合は 0 を返す。
 */
export function decisionGutterSideType(currentGutterSide: number | 'auto', currentFontSize: number): number {
  if (currentGutterSide === 'auto') {
    return 0;
  }
  return currentGutterSide * currentFontSize;
}

/**
 * カラム幅を返す。
 * "fluid" の場合は利用可能幅を等分割。数値の場合は文字数換算の固定幅。
 */
export function decisionColumnSizeType(
  currentFontSize: number,
  currentSizeChar: 'fluid' | number,
  currentWidth: number,
  currentColumnNum: number,
  currentGutterTotal: number,
  currentGutterSideEachInstallments: number,
): number {
  const totalFluidWidth = currentWidth - currentGutterTotal;
  if (currentSizeChar === 'fluid') {
    return totalFluidWidth / currentColumnNum - currentGutterSideEachInstallments;
  }
  return currentFontSize * currentSizeChar - currentGutterSideEachInstallments;
}

// -----------------------------------------------------------------------
// view 関連
// -----------------------------------------------------------------------

/** SVG要素の width / height / viewBox 属性を更新する */
export function setSvgSizes(targetSvgId: string, currentWidth: number, currentHeight: number): void {
  const svgAll = document.getElementById(targetSvgId);
  if (!svgAll) return;
  svgAll.setAttribute('width', String(currentWidth));
  svgAll.setAttribute('height', String(currentHeight));
  svgAll.setAttribute('viewBox', `0 0 ${currentWidth} ${currentHeight}`);
}

/** 要素の子ノードをすべて削除する */
export function reset(resetElem: Element): void {
  resetElem.replaceChildren();
}

/**
 * #tg_all 内に <style id="tg_style"> を挿入する。
 * @param cssText - 挿入するCSSテキスト
 */
export function insertStyleElem(cssText: string): void {
  const style = document.createElement('style');
  const target = document.getElementById('tg_all');
  if (!target) return;
  style.setAttribute('id', 'tg_style');
  style.textContent = cssText;
  target.appendChild(style);
}

/** #tg_all ルートdivを body末尾に追加し、innerHTML を設定する */
export function wrapper(htmlSet: string, model: TypegridModel): void {
  const root = document.createElement('div');
  const htmlBody = document.body;
  root.setAttribute('id', 'tg_all');
  root.setAttribute('role', 'presentation');
  root.setAttribute('aria-hidden', 'true');
  htmlBody.appendChild(root);
  root.innerHTML = htmlSet;
  void model; // 将来的な拡張用（サイズ参照など）
}

// -----------------------------------------------------------------------
// controller 関連（メディアクエリ・リサイズ・キーバインド）
// -----------------------------------------------------------------------

/**
 * メディアクエリのリスナーを登録するクロージャ。
 * 旧実装は `this` に状態を保持していたが、TS移行後はクロージャで管理する。
 *
 * 変更点:
 * - addListener() → addEventListener('change', ...) に変更（非推奨API修正）
 *
 * @returns リスナー解除用の unlistenMediaQueries 関数
 */
export function listenMediaQueries(
  model: TypegridModel,
  _view: TypegridView,
  callBack: (mediaIndex: number) => void,
): () => void {
  const myBreakPoints = model.user.media.contents.breakPoints.width.min;
  const myDevices = model.user.media.devices;
  const myUnit = model.user.general.unit.breakPoints;

  let myMediaQueryIndex = -1;
  const myMediaQueries: (MediaQueryList & { typegridIndex?: number })[] = [];

  const myRender = (newMediaQueryIndex: number): void => {
    myMediaQueryIndex = newMediaQueryIndex;
    console.info(
      `[typegrid] media query matched: ${myDevices[myMediaQueryIndex]} (index: ${myMediaQueryIndex})`,
    );
    callBack(myMediaQueryIndex);
  };

  const checkMediaQuery = (mql: MediaQueryList & { typegridIndex?: number }): number => {
    if (mql.matches) {
      const newIndex = mql.typegridIndex;
      if (newIndex !== undefined && !isNaN(newIndex) && myMediaQueryIndex !== newIndex) {
        return newIndex;
      }
    }
    return -1;
  };

  const mediaQueryListener = (event: MediaQueryListEvent): void => {
    // event.target は MediaQueryList
    const mql = event.target as (MediaQueryList & { typegridIndex?: number }) | null;
    if (!mql) return;
    const newIndex = checkMediaQuery(mql);
    if (newIndex > -1) {
      myRender(newIndex);
    }
  };

  myBreakPoints.forEach((myBreakPoint, myIndex, myBreakPointsArray) => {
    const nextBreakPoint = myBreakPointsArray[myIndex + 1];
    const queryParts = [`screen and (min-width: ${myBreakPoint}${myUnit})`];
    if (nextBreakPoint !== undefined) {
      queryParts.push(`and (max-width: ${nextBreakPoint - 1}${myUnit})`);
    }
    const mql = window.matchMedia(queryParts.join(' ')) as MediaQueryList & { typegridIndex?: number };
    mql.typegridIndex = myIndex;

    // 非推奨の addListener() の代わりに addEventListener('change', ...) を使用
    mql.addEventListener('change', mediaQueryListener);
    myMediaQueries.push(mql);

    // 初期チェック
    if (mql.matches) {
      const newIndex = checkMediaQuery(mql);
      if (newIndex > -1) {
        model.currentMedia = model.getJsonValues(newIndex);
      }
    }
  });

  // 解除関数を返す
  return function unlistenMediaQueries(): void {
    myMediaQueries.forEach((mql) => {
      mql.removeEventListener('change', mediaQueryListener);
    });
  };
}

/**
 * ResizeObserver でドキュメントのサイズ変化を監視する。
 * requestAnimationFrame で1フレームに1回だけコールバックを呼ぶ。
 * @returns 監視解除用の uncheckWindowSize 関数
 */
export function checkWindowSize(
  model: TypegridModel,
  _view: TypegridView,
  callBack: () => void,
): () => void {
  let rafId = -1;

  const observer = new ResizeObserver(() => {
    if (rafId !== -1) return;
    rafId = requestAnimationFrame(() => {
      model.debug.count.resize += 1;
      callBack();
      rafId = -1;
    });
  });

  observer.observe(document.documentElement);

  return function uncheckWindowSize(): void {
    if (rafId !== -1) cancelAnimationFrame(rafId);
    observer.disconnect();
  };
}

/**
 * キーボードショートカットのリスナーを登録する。
 * g キー: グリッド表示/非表示トグル
 * p キー: fixed/absolute 切替
 * @returns リスナー解除用の unKeyBinds 関数
 */
export function keyBinds(model: TypegridModel, _view: TypegridView): () => void {
  let displayStatus = model.visibility;
  let fixedStatus = model.fixed;
  const all = document.getElementById('tg_all');
  if (!all) return () => {};

  const handler = (event: KeyboardEvent): void => {
    if (event.key === 'g') {
      displayStatus = !displayStatus;
      all.style.display = displayStatus ? 'block' : 'none';
    }
    if (event.key === 'p') {
      fixedStatus = !fixedStatus;
      all.style.position = fixedStatus ? 'fixed' : 'absolute';
    }
  };

  document.body.addEventListener('keydown', handler);

  return function unKeyBinds(): void {
    document.body.removeEventListener('keydown', handler);
  };
}

// -----------------------------------------------------------------------
// メディアクエリ文字列生成（参照用）
// -----------------------------------------------------------------------

/**
 * デバイスとブレークポイントの配列からメディアクエリ文字列の配列を生成する。
 * controller ではなく utils の純粋関数として提供する。
 */
export function buildMediaQueries(devices: string[], breakPoints: number[], unit: string): string[] {
  return breakPoints.map((bp, index) => {
    if (index === 0) {
      return `screen and (max-width: ${breakPoints[index + 1]! - 1}${unit})`;
    } else if (index === breakPoints.length - 1) {
      return `screen and (min-width: ${bp}${unit})`;
    } else {
      return `screen and (min-width: ${bp}${unit}) and (max-width: ${breakPoints[index + 1]! - 1}${unit})`;
    }
  });
  void devices; // デバイス名は呼び出し元がログ出力に使用
}
