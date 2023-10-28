/**
 * LCG parameters from https://www.ams.org/journals/mcom/1999-68-225/S0025-5718-99-00996-5/S0025-5718-99-00996-5.pdf
 */
const lcgMap: (number[] | bigint[])[] = [
  [],
  [41, 26, 30],
  [1021, 331, 401], // 2^10 - 3
  [65521, 2469, 47104], // 2^16 - 15
  [2097143, 1939807, 1969917], // 2^21 - 9
  [67108859, 6763103, 66117721], // 2^26 - 5
  [4294967291n, 279470273n, 1815976680n], // 2^32 - 5
  [137438953447n, 85876534675n, 116895888786n], // 2^37 - 25
  [4398046511093n, 92644101553n, 626031856758n], // 2^42 - 11
  [281474976710597n, 59279420901007n, 163724808306782n], // 2^48 - 59
  [9007199254740881n, 5667072534355537n, 7982986707690649n], // 2^53 - 111
  [288230376151711717n, 28146528635210647n, 206638310974457555n], // 2^58 - 27
  [18446744073709551557n, 811465980874026894n, 18263440312458789471n] // 2^64 - 59
];

function nextNumber(value: number, base: number, map: number[]): number {
  value = value * map[1] % map[0] + base;
  return value < map[0] ? value : value - map[0] + 1;
}

function nextBigInt(value: bigint, base: bigint, map: bigint[]): bigint {
  value = value * map[1] % map[0] + base;
  return value < map[0] ? value : value - map[0] + 1n;
}

function previousNumber(value: number, base: number, map: number[]): number {
  value -= base;
  return (value > 0 ? value : value + map[0] - 1) * map[2] % map[0];
}

function previousBigInt(value: bigint, base: bigint, map: bigint[]): bigint {
  value -= base;
  return (value > 0 ? value : value + map[0] - 1n) * map[2] % map[0];
}

export class Generator {
  private bases: (number | bigint)[];
  private bigint: boolean;

  constructor(seed?: ArrayBufferLike | ArrayBufferView, bigint: boolean = false) {
    if (seed && seed.byteLength < 8) {
      throw new RangeError("If a seed is provided it must be at least 8 bytes long.");
    }
    this.bases = new Array(13) as (number | bigint)[];
    if (seed) {
      if (ArrayBuffer.isView(seed)) {
        seed = seed.buffer;
      }
      seed = seed.slice(0, 8);
      const u32 = new Uint32Array(seed);
      const u64 = new BigUint64Array(seed);
      const n32 = u32[0];
      const b64 = u64[0];
      this.bases[1] = n32 % 40;
      this.bases[2] = n32 % 1020;
      this.bases[3] = n32 % 65520;
      this.bases[4] = n32 % 2097142;
      this.bases[5] = n32 % 67108858;
      this.bases[6] = b64 % 4294967290n;
      this.bases[7] = b64 % 137438953446n;
      this.bases[8] = b64 % 4398046511092n;
      this.bases[9] = b64 % 281474976710596n;
      this.bases[10] = b64 % 9007199254740880n;
      this.bases[11] = b64 % 288230376151711716n;
      this.bases[12] = b64 % 18446744073709551556n;
    } else {
      for (let i = 1; i < 13; i++) {
        this.bases[i] = i < 6 ? 0 : 0n;
      }
    }
    this.bigint = bigint;
  }

  next(value: number | bigint, mode: number): number | bigint {
    if (!value) {
      return value;
    }
    const map = lcgMap[mode];
    const base = this.bases[mode];

    if (mode > 5) {
      const result = nextBigInt(typeof value === "bigint" ? value : BigInt(value), base as bigint, map as bigint[]);
      return mode > 10 ? result : Number(result);
    }
    return nextNumber(typeof value === "number" ? value : Number(value), base as number, map as number[]);
  }

  previous(value: number | bigint, mode: number): number | bigint {
    if (!value) {
      return value;
    }
    const map = lcgMap[mode];
    const base = this.bases[mode];

    if (mode > 5) {
      const result = previousBigInt(typeof value === "bigint" ? value : BigInt(value), base as bigint, map as bigint[]);
      return mode > 10 || this.bigint ? result : Number(result);
    }
    const n = previousNumber(typeof value === "number" ? value : Number(value), base as number, map as number[]);
    return this.bigint ? BigInt(n) : n;
  }
}