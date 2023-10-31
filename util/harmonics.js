const maxHarmonic = 8;

const tests = [
  {
    modulus: 41,
    params: [
      [6, 7],
      [22, 28],
      [26, 30]
    ]
  },
  {
    modulus: 1021,
    params: [
      [65, 377],
      [331, 401]
    ]
  },
  {
    modulus: 65521,
    params: [
      [17364, 32236],
      [33285, 48157],
      [2469, 47104]
    ]
  },
  {
    modulus: 2097143,
    params: [
      [360889, 1372180],
      [1043187, 1352851],
      [1939807, 1969917]
    ]
  },
  {
    modulus: 67108859,
    params: [
      [26590841, 11526618],
      [19552116, 24409594],
      [66117721, 6763103]
    ]
  },
  {
    modulus: 4294967291,
    params: [
      [1588635695, 3870709308],
      [1223106847, 4223879656],
      [279470273, 1815976680]
    ]
  },
  {
    modulus: 137438953447,
    params: [
      [76886758244, 31450092817],
      [2996735870, 105638438130],
      [85876534675, 116895888786]
    ]
  },
  {
    modulus: 4398046511093,
    params: [
      [2214813540776, 4365946432566],
      [2928603677866, 3015630915308],
      [92644101553, 626031856758]
    ]
  },
  {
    modulus: 281474976710597,
    params: [
      [49235258628958, 253087341916107],
      [51699608632694, 8419150949545],
      [59279420901007, 163724808306782]
    ]
  },
  {
    modulus: 9007199254740881,
    params: [
      [2082839274626558, 3141627116318043],
      [4179081713689027, 1169831480608704],
      [5667072534355537, 7982986707690649]
    ]
  },
  {
    modulus: 288230376151711717n,
    params: [
      [101565695086122187n, 56502943171806276n],
      [163847936876980536n, 256462492811829427n],
      [206638310974457555n, 28146528635210647n]
    ]
  },
  {
    modulus: 18446744073709551557n,
    params: [
      [13891176665706064842n, 9044836419713972268n],
      [2227057010910366687n, 17412224886468018797n],
      [18263440312458789471n, 811465980874026894n]
    ]
  }
]

let a, b;
tests.forEach((test) => {
  const bigint = typeof test.modulus === "bigint";
  let max = 0;
  let best;
  test.params.forEach((param) => {
    let score = 0;
    if (bigint) {
      a = Number(param[0] * 1000000n / test.modulus) / 1000000;
      b = Number(param[1] * 1000000n / test.modulus) / 1000000;
    } else {
      a = param[0] / test.modulus;
      b = param[1] / test.modulus;
    }
    for (let i = 1; i <= maxHarmonic; i++) {
      let mina = a;
      let minb = b;
      for (let j = 1; j <= i; j++) {
        mina = Math.min(mina, Math.abs(j / i - a));
        minb = Math.min(minb, Math.abs(j / i - b));
      }
      score += mina + minb;
    }
    if (!bigint) {
      score = score.toFixed(9);
    }
    if (score > max) {
      max = score;
      best = param;
    }
    // console.log(test.modulus);
    // console.log(param);
    // console.log(score);
    // console.log("");
  });
  console.log(test.modulus);
  console.log(best);
  console.log("");
});