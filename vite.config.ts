import { defineConfig } from 'vite';

export default defineConfig({
  // エントリポイント
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'typegrid',
      fileName: 'typegrid',
      formats: ['es', 'iife'],
    },
    outDir: 'dist',
    // typegrid.json は dist/ へコピーせず、ユーザーが別途配置する想定
    copyPublicDir: false,
  },
  server: {
    open: true,
  },
  // 開発サーバー: index.html をルートで配信
  root: '.',
  publicDir: 'public',
});
