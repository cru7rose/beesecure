import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** GitHub Pages (project site): VITE_BASE_PATH=my-repo → base /my-repo/ */
function pagesBase() {
  const raw = process.env.VITE_BASE_PATH?.trim();
  if (!raw || raw === '/') return '/';
  const inner = raw.replace(/^\/+|\/+$/g, '');
  return `/${inner}/`;
}
const base = pagesBase();

export default defineConfig({
  base,
  root: 'public',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'public/index.html'),
        export: path.resolve(__dirname, 'public/export.html'),
        wbs: path.resolve(__dirname, 'public/wbs.html'),
        diagram: path.resolve(__dirname, 'public/diagram.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
