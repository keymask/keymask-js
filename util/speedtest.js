import { Keymask } from "../dist/index.js";
import { performance } from "node:perf_hooks";

const keymask = new Keymask({
  length: 6
});

keymask.mask(0);

const n = 1000000;
let start;
let count = 0;
for (let i = 1; i <= n; i++) {
  start = performance.now();
  keymask.mask(i);
  count += performance.now() - start;
}

console.log(n + " iterations");
console.log(count.toFixed(6) + " ms total");
console.log((count / n).toFixed(6) + " ms per call");