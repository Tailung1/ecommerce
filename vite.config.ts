import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  root: "client", // Project root is the 'client' folder
  build: {
    outDir: "../dist", // Output the build to 'dist' outside the 'client' folder
  },
  plugins: [react()],
});
