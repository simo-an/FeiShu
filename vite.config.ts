import { rmSync } from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-electron-plugin'
import renderer from 'vite-plugin-electron-renderer'
import { resolve } from 'path'

rmSync('dist-electron', { recursive: true, force: true })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      include: ['electron'],
      transformOptions: {
        sourcemap: true,
      }
    }),
    renderer({
      resolve() {
        // explicitly specify which packages are Node.js(CJS) packages
        return [
          // C/C++ native modules
          'sqlite3',
          // Node
          'appdata-path',
          'fs-extra',
          'typeorm'
        ]
      }
    })
  ],
  resolve: {
    alias: [{
      find: "@",
      replacement: resolve(__dirname, "src")
    }]
  },
  server: {
    hmr: true,
    port: 1995,
    host: '127.0.0.1',
    open: false
  },
  clearScreen: false,
})