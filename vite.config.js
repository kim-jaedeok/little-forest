import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 필요한 경우 경로 별칭 추가
      src: path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000, // CRA와 동일한 기본 포트
    open: true,
  },
  // .js 파일에서도 JSX 구문 허용
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
