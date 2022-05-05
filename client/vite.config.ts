import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
// 배포 시 포함 X
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  mode: "production",
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    visualizer({ filename: "./dist/report.html", open: true, gzipSize: true, brotliSize: true }),
  ],
});
