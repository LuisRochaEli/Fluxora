import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  server: {
    open: true,
    // https: {
    //   key: fs.readFileSync('./.cert/key.pem'),
    //   cert: fs.readFileSync('./.cert/cert.pem'),
    // }
  },
  plugins: [react()],
  base: "/APP/FLUXORA",
});
