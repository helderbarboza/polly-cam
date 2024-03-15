import { sveltekit } from "@sveltejs/kit/vite";
import fs from "fs";
import { defineConfig } from "vite";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    https: {
      key: isProduction ? undefined : fs.readFileSync("localhost-key.pem"),
      cert: isProduction ? undefined : fs.readFileSync("localhost.pem"),
    },
  },
});
