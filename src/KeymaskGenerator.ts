import { clampBuffer } from "./bufferUtils";

// LCG parameters from https://www.ams.org/journals/mcom/1999-68-225/S0025-5718-99-00996-5/S0025-5718-99-00996-5.pdf
// Errata: https://www.iro.umontreal.ca/~lecuyer/myftp/papers/latrules99Errata.pdf
// In each case, the selected parameters are those that are least proximal to
// low harmonic factors of the modulus (1...8). See `util/harmonics.js`. This
// means that they are least likely to present repeating patterns across short
// sequences of values.
const lcgMap41: (number[] | bigint[])[] = [
  [],
  [41, 22, 28],
  [1021, 65, 377], // 2^10 - 3
  [65521, 17364, 32236], // 2^16 - 15
  [2097143, 1043187, 1352851], // 2^21 - 9
  [67108859, 19552116, 24409594], // 2^26 - 5
  [4294967291n, 1588635695n, 3870709308n], // 2^32 - 5
  [137438953447n, 31450092817n, 76886758244n], // 2^37 - 25
  [4398046511093n, 2928603677866n, 3015630915308n], // 2^42 - 11
  [281474976710597n, 59279420901007n, 163724808306782n], // 2^48 - 59
  [9007199254740881n, 2082839274626558n, 3141627116318043n], // 2^53 - 111
  [288230376151711717n, 56502943171806276n, 101565695086122187n], // 2^58 - 27
  [18446744073709551557n, 9044836419713972268n, 13891176665706064842n] // 2^64 - 59
];

const lcgMap24: (number[] | bigint[])[] = [
  [],
  [23, 7, 10],
  [509, 110, 236], // 2^9 - 3
  [8191, 1716, 5580], // 2^13 - 1
  [262139, 92717, 166972], // 2^18 - 5
  [4194301, 1731287, 2040406], // 2^22 - 3
  [134217689, 45576512, 70391260], // 2^27 - 39
  [4294967291n, 1588635695n, 3870709308n], // 2^32 - 5
  [68719476731n, 40162435147n, 45453986995n], // 2^36 - 5
  [2199023255531n, 717943173063n, 1319743354064n], // 2^41 - 21
  [35184372088777n, 11850386302026n, 18586042069168n], // 2^45 - 55
  [1125899906842597n, 605985299432352n, 791038363307311n], // 2^50 - 27
  [36028797018963913n, 19708881949174686n, 32182684885571630n], // 2^55 - 55
  [576460752303423433n, 287514719519235431n, 346764851511064641n], // 2^59 - 55
  [18446744073709551557n, 9044836419713972268n, 13891176665706064842n] // 2^64 - 59
];

/**
 * Provides an array of Multiplicative Linear Congruential Generators whose
 * moduli are compatible with KeymaskEncoder.
 */
export class KeymaskGenerator {
  private offsets: (number | bigint)[];
  private safe: boolean;

  /**
   * Create a Generator with custom offsets.
   * @param {?ArrayBuffer} seed 8-byte seed value.
   * @param {?boolean} safe Use safe mode (base24).
   */
  constructor(seed?: ArrayBuffer, safe: boolean = false) {
    this.safe = safe;
    this.offsets = new Array(safe ? 15 : 13) as (number | bigint)[];
    if (seed) {
      const data = new DataView(clampBuffer(seed, 8));
      const n32 = (data.getUint32(0, true) ^ data.getUint32(4, true)) >>> 0;
      const n64 = data.getBigUint64(0, true);
      if (safe) {
        for (let i = 1; i < 15; i++) {
          if (i < 7) {
            this.offsets[i] = n32 % (<number>lcgMap24[i][0] - 1);
          } else if (i > 7) {
            this.offsets[i] = n64 % (<bigint>lcgMap24[i][0] - 1n);
          } else {
            this.offsets[7] = BigInt(n32 % 4294967290);
          }
        }
      } else {
        for (let i = 1; i < 13; i++) {
          if (i < 6) {
            this.offsets[i] = n32 % (<number>lcgMap41[i][0] - 1);
          } else if (i > 6) {
            this.offsets[i] = n64 % (<bigint>lcgMap41[i][0] - 1n);
          } else {
            this.offsets[6] = BigInt(n32 % 4294967290);
          }
        }
      }
    } else if (safe) {
      for (let i = 1; i < 15; i++) {
        this.offsets[i] = i < 7 ? 0 : 0n;
      }
    } else {
      for (let i = 1; i < 13; i++) {
        this.offsets[i] = i < 6 ? 0 : 0n;
      }
    }
  }

  bigIntOutput(length: number): boolean {
    return !this.safe && length > 10 || this.safe && length > 11;
  }

  /**
   * Calculate the next value in the given MLCG sequence.
   * @param {number | bigint} value The starting value.
   * @param {number} range The MLCG range (corresponds to encoded output length).
   * @param {?boolean} bigint Cast all outputs as BigInt.
   * @returns {number | bigint} The next value in the MLCG sequence.
   */
  next(value: number | bigint, range: number, bigint: boolean = false): number | bigint {
    if (!value) {
      return this.bigIntOutput(range) || bigint ? 0n : 0;
    }
    const map = this.safe ? lcgMap24 : lcgMap41;
    const mod = map[range][0];
    const mult = map[range][1];
    const offset = this.offsets[range];

    if (!this.safe && range > 5 || this.safe && range > 6) {
      if (typeof value === "number") {
        value = BigInt(value);
      }
      value = value * <bigint>mult % <bigint>mod + <bigint>offset;
      value = value < <bigint>mod ? value : value - <bigint>mod + 1n;
      return this.bigIntOutput(range) || bigint ? value : Number(value);
    }
    if (typeof value === "bigint") {
      value = Number(value);
    }
    value = value * <number>mult % <number>mod + <number>offset;
    value = value < <number>mod ? value : value - <number>mod + 1;
    return bigint ? BigInt(value) : value;
  }

  /**
   * Calculate the previous value in the given MLCG sequence.
   * @param {number | bigint} value The starting value.
   * @param {number} range The MLCG range (corresponds to encoded output length).
   * @param {?boolean} bigint Cast all outputs as BigInt.
   * @returns {number | bigint} The previous value in the MLCG sequence.
   */
  previous(value: number | bigint, range: number, bigint: boolean = false): number | bigint {
    if (!value) {
      return this.bigIntOutput(range) || bigint ? 0n : 0;
    }
    const map = this.safe ? lcgMap24 : lcgMap41
    const mod = map[range][0];
    const mult = map[range][2];
    const offset = this.offsets[range];

    if (!this.safe && range > 5 || this.safe && range > 6) {
      if (typeof value === "number") {
        value = BigInt(value);
      }
      value -= <bigint>offset;
      value = (value > 0 ? value : value + <bigint>mod - 1n) * <bigint>mult % <bigint>mod;
      return this.bigIntOutput(range) || bigint ? value : Number(value);
    }
    if (typeof value === "bigint") {
      value = Number(value);
    }
    value -= <number>offset;
    value = (value > 0 ? value : value + <number>mod - 1) * <number>mult % <number>mod;
    return bigint ? BigInt(value) : value;
  }
}