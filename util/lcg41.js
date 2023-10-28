// Makeshift script to roughly quantify the quality of base41 LCGs.
// Basically this measures the number of flipped bits at each step
// and picks the full-cycle LCG that comes closest to flipping half
// the bits at each step, with the smallest standard deviation.

const mod = 41;
const steps = mod - 1;
const half = steps / 2;
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
  let d = 0;
  let p = 1;
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
    let flipped = 0;
    while (flip > 0) {
      flipped += flip & 1;
      flip >>= 1;
    }
    flips.push(flipped);
    sum += flipped;

    d += Math.min(Math.abs(val - p), Math.abs((val + half) % steps - (p + half) % steps));
    p = val;
  }

  if (ok) {
    const mean = sum / flips.length;

    let devsum = 0;
    flips.forEach((f) => {
      devsum += Math.pow(f - mean, 2);
    });
    const dev = Math.sqrt(devsum / flips.length);
    const delta = d / flips.length;
    const match = (Math.abs(mean - halfbits) / halfbits);
    const quality = delta / dev / Math.pow(1 + match, 2);
    // const score = delta / dev;

    console.log("mult: " + i);
    console.log("mean: " + mean);
    console.log("match: " + match);
    console.log("stddev: " + dev);
    console.log("step: " + delta);
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
      dev: dev,
      step: delta
    });
    if (quality > maxScore) {
      maxScore = quality;
    }
  }
}

console.log(maxScore);
console.log(scores[maxScore.toFixed(5)]);
