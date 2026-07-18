import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Avoid EBUSY crashes on OneDrive-locked media files
      ignored: ["**/public/assets/video/**", "**/scratchedspace/**"],
    },
  },
});
