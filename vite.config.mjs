import 'dotenv/config'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { builtinModules } from 'node:module'
import process from 'node:process'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'node:fs'
import wasm from 'vite-plugin-wasm'
// import topLevelAwait from 'vite-plugin-top-level-await'

const prod = !!process.env.PRODUCTION
if (prod) {
  console.log('Using production build settings')
}

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    wasm(),
    // topLevelAwait(),
    tailwindcss(),
    svelte(),
    {
      name: 'copy-to-obsidian-vault',
      apply: 'build',
      // Use closeBundle hook to ensure outfiles are written to disk before running
      closeBundle(error) {
        // do nothing if the build had an error
        if (error) return

        if (!process.env.DEV_VAULT_DIRECTORY) {
          throw new Error('DEV_VAULT_DIRECTORY is not defined!')
        }

        copyFileSync(
          resolve(__dirname, 'manifest.json'),
          `${process.env.DEV_VAULT_DIRECTORY}/.obsidian/plugins/tag-folders/manifest.json`,
        )
        copyFileSync(
          resolve(__dirname, 'dist/main.js'),
          `${process.env.DEV_VAULT_DIRECTORY}/.obsidian/plugins/tag-folders/main.js`,
        )
        copyFileSync(
          resolve(__dirname, 'dist/styles.css'),
          `${process.env.DEV_VAULT_DIRECTORY}/.obsidian/plugins/tag-folders/styles.css`,
        )
      },
    },
  ],
  resolve: {
    alias: {
      $lib: resolve(__dirname, 'src/lib'),
    },
  },
  assetsInclude: ['**/*.wasm'],
  build: {
    // Using Vite in library mode https://vite.dev/guide/build.html#library-mode
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['cjs'],
      fileName: 'main',
      cssFileName: 'styles',
    },
    outDir: 'dist',
    watch: {
      include: ['src/**/*'],
    },
    rollupOptions: {
      external: [
        'obsidian',
        'electron',
        '@codemirror/autocomplete',
        '@codemirror/collab',
        '@codemirror/commands',
        '@codemirror/language',
        '@codemirror/lint',
        '@codemirror/search',
        '@codemirror/state',
        '@codemirror/view',
        '@lezer/common',
        '@lezer/highlight',
        '@lezer/lr',
        ...builtinModules,
      ],
      treeshake: true,
    },
    target: 'esnext',
    sourcemap: prod ? false : 'inline',
    minify: prod,
  },
})
