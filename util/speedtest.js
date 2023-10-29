import { Keymask, Generator, Base41 } from "../dist/index.js";
import { performance } from "node:perf_hooks";

const keymask = new Keymask({
  length: 6
});

const generator = new Generator();
const base41 = new Base41({
  length: 6,
  pad: true,
  prime: true
});

keymask.mask(1);
generator.next(1, 6);
base41.encode(1);

const n = 1000000;
let start;
let count = 0;
for (let i = 1; i <= n; i++) {
  start = performance.now();
  generator.next(i, 6);
  count += performance.now() - start;
}

console.log(n + " iterations");
console.log("");
console.log("Generator");
console.log(count.toFixed(6) + " ms total");
console.log((count / n).toFixed(6) + " ms per call");
console.log("");

count = 0;
for (let i = 1; i <= n; i++) {
  start = performance.now();
  base41.encode(i);
  count += performance.now() - start;
}

console.log("Base41");
console.log(count.toFixed(6) + " ms total");
console.log((count / n).toFixed(6) + " ms per call");
console.log("");

count = 0;
for (let i = 1; i <= n; i++) {
  start = performance.now();
  keymask.mask(i);
  count += performance.now() - start;
}

console.log("Keymask");
console.log(count.toFixed(6) + " ms total");
console.log((count / n).toFixed(6) + " ms per call");