import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/hooks/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  target: "es2015",
});
