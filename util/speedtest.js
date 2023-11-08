import { Keymask, KeymaskGenerator, KeymaskEncoder } from "../dist/index.js";
import { performance } from "node:perf_hooks";

const n = 1000000;
const length = 6;
const test = "keymask"; // "generator", "encoder"

console.log(n + " iterations");
console.log("");

let start;
let count = 0;

if (test === "generator") {
  const generator = new KeymaskGenerator();
  generator.next(1, 6);

  for (let i = 1; i <= n; i++) {
    start = performance.now();
    generator.next(i, 6);
    count += performance.now() - start;
  }

  console.log("KeymaskGenerator");
  console.log(count.toFixed(6) + " ms total");
  console.log((count / n).toFixed(6) + " ms per call");
  console.log("");

} else if (test === "encoder") {
  const encoder = new KeymaskEncoder();
  encoder.encode(1);

  for (let i = 1; i <= n; i++) {
    start = performance.now();
    encoder.encode(i);
    count += performance.now() - start;
  }

  console.log("KeymaskEncoder");
  console.log(count.toFixed(6) + " ms total");
  console.log((count / n).toFixed(6) + " ms per call");
  console.log("");

} else if (test === "keymask") {
  const keymask = new Keymask({
    size: length
  });
  keymask.mask(1);

  for (let i = 1; i <= n; i++) {
    start = performance.now();
    keymask.mask(i);
    count += performance.now() - start;
  }

  console.log("Keymask");
  console.log(count.toFixed(6) + " ms total");
  console.log((count / n).toFixed(6) + " ms per call");
}
