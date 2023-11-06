import typescript from "@rollup/plugin-typescript";
import cleanup from "rollup-plugin-cleanup";
import { dts } from "rollup-plugin-dts";

export default [
  {
    input: "build/index.js",
    output: [
      {
        file: "dist/index.cjs",
        format: "cjs"
      },
      {
        file: "dist/index.js",
        format: "esm"
      }
    ],
    plugins: [
      typescript({
        exclude: ["**/*.d.ts"]
      }),
      cleanup({
        comments: "jsdoc"
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
