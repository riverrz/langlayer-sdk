import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/devtools.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  target: "es2015",
});
