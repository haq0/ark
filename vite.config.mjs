import { defineConfig } from 'npm:vite@^5.2.10'
import vue from 'npm:@vitejs/plugin-vue@^5.0.4'

import 'npm:vue@^3.4.23'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: []
  },
  base: '/',
  server: {
    proxy: {
      '/blog-posts': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blog-posts/, '/public/blog-posts')
      }
    }
  }
})
