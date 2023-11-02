import { Keymask, Generator, Base41 } from "../dist/index.js";
import { performance } from "node:perf_hooks";

const n = 1000000;
const length = 6;
const test = "keymask"; // "generator", "base41"

console.log(n + " iterations");
console.log("");

let start;
let count = 0;

if (test === "generator") {
  const generator = new Generator();
  generator.next(1, 6);

  for (let i = 1; i <= n; i++) {
    start = performance.now();
    generator.next(i, 6);
    count += performance.now() - start;
  }

  console.log("Generator");
  console.log(count.toFixed(6) + " ms total");
  console.log((count / n).toFixed(6) + " ms per call");
  console.log("");

} else if (test === "base41") {
  const base41 = new Base41();
  base41.encode(1);

  for (let i = 1; i <= n; i++) {
    start = performance.now();
    base41.encode(i);
    count += performance.now() - start;
  }

  console.log("Base41");
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
