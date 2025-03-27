import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ecommerce-store-with-reactj-laravel-', // 👈 Thêm dòng này
})
