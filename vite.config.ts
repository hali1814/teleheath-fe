import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
    svgrPlugin({
      svgrOptions: {
        replaceAttrValues: {
          '#A8071A': 'currentColor',
          '#FFFFFF': 'currentColor',
          white: 'currentColor',
          '#B3B3B3': 'currentColor',
          '#fff': 'currentColor',
          '#ffffff': 'currentColor',
        },
      },
    }),
  ],
})

export default config
