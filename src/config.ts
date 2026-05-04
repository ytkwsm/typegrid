/**
 * config.ts
 * ライブラリ内部の定数・デフォルト設定。
 * 旧: src/js/data/config.js
 */

import type { LibConfig, ConsoleColors, DebugState } from './types/typegrid.d.ts';

export const debug: DebugState = {
  count: {
    resize: 0,
  },
};

export const msg = {
  get: {
    notfound:
      'Cannot find typegrid.json. Please put it in the same directory as typegrid.js.',
  },
  attention: {
    deviceDecision:
      'Current typegrid.js does not support user agent judgment.',
  },
  err: {
    deviceDicision:
      'Please set "@media" or "userAgent" to general.deviceDecision of typegrid.json.',
  },
};

export const lib: LibConfig = {
  name: 'typegrid.js',
  prefix: 'tg_',
  json: {
    file: 'typegrid.json',
    storage: 'typegrid_json',
  },
};

export const consoleCss: ConsoleColors = {
  red: 'color:#f00;',
  green: 'color:#0f0;',
  blue: 'color:#00f;',
};

export const attr = {
  svg: {
    ns: 'http://www.w3.org/2000/svg',
    width: 100,
  },
};

export const aria = {
  presen: "role='presentation'",
  hidden: "aria-hidden='true'",
};

export const style = {
  mode: 'horizontal-tb', // "horizontal-tb" | "vertical-rl"
  pointerEvents: 'pointer-events: none;',
};

export const styleBase = `
:root {
    --tg-color-column: #ff0000;
    --tg-color-row: #ff0000;
    --tg-color-rhythm: #999999;
}
#tg_all {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99900;
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 100%;
    overflow: hidden;
    font-feature-settings: "palt";
    pointer-events: none;
}
#tg_originForWidth {
    pointer-events: none;
    position: absolute;
    top: 0;
    width: calc(100vw - 100%);
    height: 1px;
    opacity: 0;
}
#tg_wrapper {
    pointer-events: none;
}
#tg_ruler {
    width: 100%;
    min-width: 100%;
}
#tg_ruler, #tg_setting, #tg_gui {
    pointer-events: auto;
}
#tg_layout__body rect {
    fill: var(--tg-color-column);
    fill-opacity: 0.125;
    stroke: var(--tg-color-column);
    stroke-opacity: 0.5;
}
#tg_row__body rect {
    fill: var(--tg-color-row);
    fill-opacity: 0.125;
    stroke: var(--tg-color-row);
    stroke-opacity: 0.5;
}
#tg_rhythm__body line {
    fill: none;
    stroke: var(--tg-color-rhythm);
    stroke-width: 0.5;
    stroke-opacity: 0.75;
}
`;

export const sizes = {
  test: 280,
  char: 16,
  gutter: 2,
};

export const num = {
  grid: 1,
  unit: 1,
  guide: 1,
  char: 1,
};

export const color = {
  grid: '#cccccc',
};

export const elem = {
  wrapper: {
    html: [
      "<div id='tg_wrapper'>",
      "<svg id='tg_grid'>",
      "<g id='tg_base'><g id='tg_base__body'></g></g>",
      "<g id='tg_unit'><g id='tg_unit__body'></g></g>",
      "<g id='tg_sizes'><g id='tg_sizes__body'></g></g>",
      "<g id='tg_chars'><g id='tg_chars__body'></g></g>",
      "<g id='tg_layout'><g id='tg_layout__body'></g></g>",
      "<g id='tg_row'><g id='tg_row__body'></g></g>",
      "<g id='tg_rhythm'><g id='tg_rhythm__body'></g></g>",
      '</svg>',
      '</div>',
      "<div id='tg_ruler'><div id='tg_ruler__body'></div></div>",
      "<div id='tg_settings'></div>",
      "<div id='tg_gui'><div id='tg_gui__body'></div></div>",
    ].join(''),
  },
};
