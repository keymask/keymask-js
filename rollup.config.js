import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";

export default [
  {
    input: "build/index.js",
    output: [
      {
        file: "dist/index.cjs",
        format: "cjs",
        sourcemap: true
      },
      {
        file: "dist/index.js",
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [
      typescript({
        exclude: ["**/*.d.ts", "**/*.d.ts.map"]
      })
    ]
  },
  {
    input: "build/index.d.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "esm"
      }
    ],
    plugins: [
      dts()
    ]
  }
];
