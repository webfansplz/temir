import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    // include: ['**/__tests__/**'],
    globals: true,
    environment: 'node',
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    setupFiles: [
      resolve(__dirname, 'packages/.test/setup.ts'),
    ],
  },
  plugins: [
    Vue(),
  ],
})
