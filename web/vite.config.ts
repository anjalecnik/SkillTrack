import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const testEnv = loadEnv("test", process.cwd(), "");
  return {
    define: {
      "process.env": env,
      global: "window",
    },
    optimizeDeps: {
      include: ["react/jsx-runtime"],
    },
    resolve: {
      alias: {
        "~": "/app/",
      },
    },
    plugins: [
      !env.VITEST &&
        remix({
          ssr: false,
        }),
      tsconfigPaths(),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      env: testEnv,
      setupFiles: ["./app/__tests__/setup.ts"],
    },
    server: {
      watch: {
        ignored: ["**/node_modules/**", "**/.git/**"],
      },
    },
  };
});
