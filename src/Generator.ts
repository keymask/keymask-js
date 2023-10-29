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

export class Generator {
  private offsets: (number | bigint)[];
  private bigint: boolean;

  constructor(seed?: ArrayBufferLike | ArrayBufferView, bigint: boolean = false) {
    this.offsets = new Array(13) as (number | bigint)[];
    if (seed && seed.byteLength > 7) {
      if (ArrayBuffer.isView(seed)) {
        seed = seed.buffer;
      }
      seed = seed.slice(0, 8);
      const n32 = new Uint32Array(seed)[0];
      const b64 = new BigUint64Array(seed)[0];
      this.offsets[1] = n32 % 40;
      this.offsets[2] = n32 % 1020;
      this.offsets[3] = n32 % 65520;
      this.offsets[4] = n32 % 2097142;
      this.offsets[5] = n32 % 67108858;
      this.offsets[6] = b64 % 4294967290n;
      this.offsets[7] = b64 % 137438953446n;
      this.offsets[8] = b64 % 4398046511092n;
      this.offsets[9] = b64 % 281474976710596n;
      this.offsets[10] = b64 % 9007199254740880n;
      this.offsets[11] = b64 % 288230376151711716n;
      this.offsets[12] = b64 % 18446744073709551556n;
    } else {
      for (let i = 1; i < 13; i++) {
        this.offsets[i] = i < 6 ? 0 : 0n;
      }
    }
    this.bigint = bigint;
  }

  next(value: number | bigint, mode: number): number | bigint {
    if (!value) {
      return mode > 10 || this.bigint ? 0n : 0;
    }
    const mod = lcgMap[mode][0];
    const mult = lcgMap[mode][1];
    const offset = this.offsets[mode];

    if (mode > 5) {
      if (typeof value === "number") {
        value = BigInt(value);
      }
      value = value * <bigint>mult % <bigint>mod + <bigint>offset;
      value = value < <bigint>mod ? value : value - <bigint>mod + 1n;
      return mode > 10 || this.bigint ? value : Number(value);
    }
    if (typeof value === "bigint") {
      value = Number(value);
    }
    value = value * <number>mult % <number>mod + <number>offset;
    value = value < <number>mod ? value : value - <number>mod + 1;
    return this.bigint ? BigInt(value) : value;
  }

  previous(value: number | bigint, mode: number): number | bigint {
    if (!value) {
      return mode > 10 || this.bigint ? 0n : 0;
    }
    const mod = lcgMap[mode][0];
    const mult = lcgMap[mode][2];
    const offset = this.offsets[mode];

    if (mode > 5) {
      if (typeof value === "number") {
        value = BigInt(value);
      }
      value -= <bigint>offset;
      value = (value > 0 ? value : value + <bigint>mod - 1n) * <bigint>mult % <bigint>mod;
      return mode > 10 || this.bigint ? value : Number(value);
    }
    if (typeof value === "bigint") {
      value = Number(value);
    }
    value -= <number>offset;
    value = (value > 0 ? value : value + <number>mod - 1) * <number>mult % <number>mod;
    return this.bigint ? BigInt(value) : value;
  }
}