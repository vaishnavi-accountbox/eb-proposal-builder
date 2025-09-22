import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8082,
    host: true
  },
  build: {
    outDir: 'dist'
  }
})

// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].templateParameters = {
        token: '', // 👈 define dummy token to avoid ReferenceError
      };
      return args;
    });
  }
}


