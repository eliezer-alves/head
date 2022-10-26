import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@auth',
        replacement: path.resolve(__dirname, 'src/modules/auth'),
      },
      {
        find: '@user',
        replacement: path.resolve(__dirname, 'src/modules/user'),
      },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@tests', replacement: path.resolve(__dirname, 'tests') },
    ],
  },
})
