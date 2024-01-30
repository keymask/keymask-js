import { blockLimit, clampBuffer, padBuffer, toBigInt } from "./bufferUtils";

const alpha41: string[] = [
  "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N",
  "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z",
  "b", "c", "d", "f", "g", "h", "j", "k", "m", "n",
  "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"
];

const alpha24: string[] = [
  "b", "c", "d", "f", "g", "h", "j", "k", "m", "n",
  "p", "q", "r", "s", "t", "v", "w", "x", "y", "z",
  "2", "5", "7", "9"
];

const factors: number[] = [
  0x055c3050, // 41*40*39*38*37
  0x53971500, // 36*35*34*33*32*31
  0x197b6830, // 30*29*28*27*26*25
  0x05c6b740, // 24*23*22*21*20*19
  0x098f6700, // 18*17*16*15*14*13*12
  0x02611500  // 11*10*9*8*7*6*5*4*3*2*1
];

/**
 * Shuffle the encoding alphabat using the Fisher-Yates algorithm and the
 * provided seed.
 * @param {?ArrayBuffer} seed The seed value.
 * @param {?boolean} safe Use safe mode (base24).
 * @returns {string[]} The shuffled encoding alphabet.
 */
function shuffleAlphabet(seed?: ArrayBuffer, safe?: boolean): string[] {
  const chars = (safe ? alpha24 : alpha41).slice(0);
  if (seed) {
    const source = new DataView(seed);
    let mod = safe ? 24 : 41;
    let value: number;
    let n: number;
    let swap: string;
    (safe ? factors.slice(3) : factors).forEach((range, i) => {
      value = source.getUint32(i * 4, true) % range;
      while (range > 1) {
        range /= mod--;
        n = Math.floor(value / range);
        value %= range;
        swap = chars[n];
        chars[n] = chars[mod];
        chars[mod] = swap;
      }
    });
  }
  return chars;
}

/**
 * Encode a numeric value (maximum 53 bits).
 * @param {number} base The encoding base (24 or 41).
 * @param {number} value The value to encode.
 * @param {string[]} chars The encoding characters.
 * @param {?number} length The target output length.
 * @returns {string} The encoded value.
 */
function encodeNumber(
  base: number,
  value: number,
  chars: string[],
  length: number = 0
): string {
  let n: number;
  let result = "";
  for (let i = 0; length === 0 && value > 0 || i < length; i++) {
    if (value) {
      n = value % base;
      value = Math.floor(value / base);
    } else {
      n = 0;
    }
    result += chars[n];
  }
  return result;
}

/**
 * Encode a bigint value (maximum 64 bits).
 * @param {number} base The encoding base (24 or 41).
 * @param {bigint} value The value to encode.
 * @param {string[]} chars The encoding characters.
 * @param {?number} length The target output length.
 * @returns {string} The encoded value.
 */
function encodeBigInt(
  base: number,
  value: bigint,
  chars: string[],
  length: number = 0
): string {
  const b = BigInt(base);
  let n: number;
  let result = "";
  for (let i = 0; length === 0 && value > 0n || i < length; i++) {
    if (value) {
      n = Number(value % b);
      value /= b;
    } else {
      n = 0;
    }
    result += chars[n];
  }
  return result;
}

/**
 * Restore a `number` value from raw decoded data.
 * @param {number} base The encoding base (24 or 41).
 * @param {Uint8Array} values Raw values to be restored.
 * @returns {number} Restored value.
 */
function restoreNumber(base: number, values: Uint8Array): number {
  let i = values.length - 1;
  let n = values[i--];
  while (i >= 0) {
    n *= base;
    n += values[i--];
  }
  return n;
}

/**
 * Restore a `bigint` value from raw decoded data.
 * @param {number} base The encoding base (24 or 41).
 * @param {Uint8Array} values Raw values to be restored.
 * @returns {bigint} Restored value.
 */
function restoreBigInt(base: number, values: Uint8Array): bigint {
  const b = BigInt(base);
  let i = values.length - 1;
  let n = BigInt(values[i--]);
  while (i >= 0) {
    n *= b;
    n += BigInt(values[i--]);
  }
  return n;
}

/**
 * Provides base24 or base41 `encode` and `decode` functions, using the requested
 * encoding base and optionally using a shuffled encoding alphabet.
 */
export class KeymaskEncoder {
  private chars: string[];
  private base: 24 | 41;
  private limit: 10 | 11;
  block: 12 | 14;

  /**
   * Create a new `KeymaskEncoder` using the provided encoding `base` and `seed`.
   * If provided, the `seed` will be used to shuffle the encoding alphabet.
   * @param {?ArrayBuffer} seed The seed value.
   * @param {?boolean} safe Use safe mode (base24).
   */
  constructor(seed?: ArrayBuffer, safe?: boolean) {
    if (safe) {
      this.base = 24;
      this.block = 14;
      this.limit = 11;
    } else {
      this.base = 41;
      this.block = 12;
      this.limit = 10;
    }
    this.chars = shuffleAlphabet(seed ? clampBuffer(seed, safe ? 12 : 24) : seed, safe);
  }

  /**
   * Encode the given value as base24 or base41.
   * @param {number | bigint | ArrayBuffer} value The value to encode.
   * @param {?number} length The target output length in characters. For inputs
   * greater than 64 bits, this applies to the final encoding block.
   * @returns {string} The encoded value.
   */
  encode(value: number | bigint | ArrayBuffer, length?: number): string {
    if (typeof value === "number") {
      return encodeNumber(this.base, value, this.chars, length);

    } else if (typeof value === "bigint") {
      if (value >= blockLimit) {
        let result = "";
        let next: bigint;
        while (value > 0n) {
          next = value / blockLimit;
          result += encodeBigInt(
            this.base,
            value % blockLimit,
            this.chars, next > 0n ? this.block : length
          );
          value = next;
        }
        return result;
      }
      return encodeBigInt(this.base, value, this.chars, length);

    }
    value = padBuffer(value, 8);
    const data = new DataView(value);
    const last = Math.ceil(value.byteLength / 8) - 1;
    let result = "";
    for (let i = 0; i <= last; i++) {
      result += encodeBigInt(
        this.base,
        data.getBigUint64(i * 8, true),
        this.chars, i < last ? this.block : length
      );
    }
    return result;
  }

  /**
   * Decode the provided value.
   * @param {string} value The value to be decoded.
   * @param {boolean} bigint Convert the result to a `BigInt`.
   * @returns {number | bigint | ArrayBuffer} The decoded value.
   */
  decode(value: string, bigint: boolean = false): number | bigint | ArrayBuffer {
    const length = value.length;
    let values = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      values[i] = this.chars.indexOf(value.charAt(i));
    }

    if (length <= this.limit && !bigint) {
      return restoreNumber(this.base, values);

    } else if (length <= this.block) {
      return restoreBigInt(this.base, values);

    } else {
      values = new Uint8Array(padBuffer(values.buffer, this.block));
      const output = new ArrayBuffer(Math.round(values.byteLength * 8 / this.block));
      const data = new DataView(output);
      for (let i = 0, j = 0; i < output.byteLength; i += 8, j += this.block) {
        data.setBigUint64(i, restoreBigInt(this.base, values.slice(j, j + this.block)), true);
      }
      if (bigint) {
        return toBigInt(data);
      }
      return data.buffer;
    }
  }
}