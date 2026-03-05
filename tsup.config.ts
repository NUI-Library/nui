import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: [
    "react", 
    "react-dom", 
    "lucide-react", 
    "recharts", 
    "zod", 
    "react-hook-form"
  ],
  noExternal: [
    "@radix-ui/.*",
    "cmdk",
    "vaul",
    "sonner",
    "embla-carousel-react",
    "react-day-picker",
    "date-fns",
    "input-otp",
    "react-resizable-panels",
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ],
  banner: {
    js: '"use client";',
  },
  treeshake: true,
  minify: true,
  target: "es2020",
  tsconfig: "tsconfig.build.json",
  outDir: "dist",
});