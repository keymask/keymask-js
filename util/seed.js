import { randomBytes } from "node:crypto";
import { argv } from "node:process";

const argv2 = argv[2];
const argv3 = argv[3];
let length = 32;
let encoding = "hex";

if (argv2) {
  const i = parseInt(argv2);
  if (isNaN(i)) {
    encoding = argv2;
  } else {
    length = i;
  }
}
if (argv3) {
  encoding = argv3;
}

console.log(randomBytes(length).toString(encoding));