import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Ecommerce-store-with-Reactj-Laravel-/', // 👈 Thêm dòng này
})
