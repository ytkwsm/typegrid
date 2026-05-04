/**
 * snippet.ts
 * スクリプトのファイルパスを取得するユーティリティ。
 * 旧: src/js/modules/snippet.js
 */

/**
 * 現在実行中のスクリプト（typegrid.js）のURLを返す。
 * `document.currentScript` が使えない環境では最後に読み込まれた
 * script 要素の src を返す。
 */
export function tgFilePathOrigin(): string {
  if (document.currentScript) {
    return (document.currentScript as HTMLScriptElement).src;
  }

  const loadScripts = document.getElementsByTagName('script');
  const script = loadScripts[loadScripts.length - 1];
  if (script?.src) {
    return script.src;
  }

  return '';
}
