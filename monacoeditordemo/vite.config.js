import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './scripteditor/'
  // base:process.env.NODE_ENV === 'production' 
  // ? '/Monaca-Editor-Demo' // prod 
  // : './', // dev
})
