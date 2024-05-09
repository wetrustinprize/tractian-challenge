import { defineConfig } from 'vite'
import vitePluginSvgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSvgr()],
})
