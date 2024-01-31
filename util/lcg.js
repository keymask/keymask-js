// Makeshift script to roughly quantify the quality of small LCGs.
// Basically this measures the number of flipped bits at each step
// and picks the full-cycle LCG that comes closest to flipping half
// the bits at each step, with the smallest standard deviation.

const mod = 23;
// const mod = 41;
const steps = mod - 1;
// const half = steps / 2;
const halfbits = Math.log2(mod) / 2;
// const results = [];
const scores = {};
let maxScore = 0;

for (let i = 2; i < mod; i++) {
  const values = [];
  let value = 1;
  for (let t = 0; t < steps; t++) {
    value *= i;
    value %= mod;
    values.push(value);
  }
  let ok = true;
  // let d = 0;
  let p = 1;
  let p2 = values[values.length - 2];
  let p3 = values[values.length - 3];
  let p4 = values[values.length - 4];
  let flips = [];
  let sum = 0;
  for (let j = 0; j < values.length; j++) {
    const val = values[j];
    for (let k = 0; k < values.length; k++) {
      if (values[k] === val && k !== j) {
        ok = false;
        break;
      }
    }
    if (!ok) {
      break;
    }
    let flip = val ^ p;
    let flip2 = val ^ p2;
    let flip3 = val ^ p3;
    let flip4 = val ^ p4;
    let flipped = 0;
    let flipped2 = 0;
    let flipped3 = 0;
    let flipped4 = 0;
    while (flip > 0) {
      flipped += flip & 1;
      flip >>= 1;
    }
    while (flip2 > 0) {
      flipped2 += flip2 & 1;
      flip2 >>= 1;
    }
    while (flip3 > 0) {
      flipped3 += flip3 & 1;
      flip3 >>= 1;
    }
    while (flip4 > 0) {
      flipped4 += flip4 & 1;
      flip4 >>= 1;
    }
    flips.push(flipped);
    flips.push(flipped2);
    flips.push(flipped3);
    flips.push(flipped4);
    sum += flipped + flipped2 + flipped3 + flipped4;

    // d += Math.min(Math.abs(val - p), Math.abs((val + half) % steps - (p + half) % steps));
    // d += Math.min(Math.abs(val - p2), Math.abs((val + half) % steps - (p2 + half) % steps));
    p4 = p3;
    p3 = p2;
    p2 = p;
    p = val;
  }

  if (ok) {
    const mean = sum / flips.length;

    let devsum = 0;
    flips.forEach((f) => {
      devsum += Math.pow(f - mean, 2);
    });
    const dev = Math.sqrt(devsum / flips.length);
    // const delta = d / flips.length;
    const match = (Math.abs(mean - halfbits) / halfbits);
    const quality = 1 / Math.pow(dev, 2) / match;
    // const quality = 1 / dev / Math.pow(1 + match, 1);
    // const score = delta / dev;

    console.log("mult: " + i);
    console.log("mean: " + mean);
    console.log("match: " + match);
    console.log("stddev: " + dev);
    // console.log("step: " + delta);
    console.log("score: " + quality);

    console.log(values);

    const scoreFixed = (quality).toFixed(5);
    if (!scores[scoreFixed]) {
      scores[scoreFixed] = [];
    }
    scores[scoreFixed].push({
      mult: i,
      mean: mean,
      match: match,
      dev: dev
      // step: delta
    });
    if (quality > maxScore) {
      maxScore = quality;
    }
  }
}

console.log(maxScore);
console.log(scores[maxScore.toFixed(5)]);
