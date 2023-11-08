import { blockLimit, clampBuffer, padBuffer, toBigInt } from "./bufferUtils";

const alphabet: string[] = [
  "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N",
  "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z",
  "b", "c", "d", "f", "g", "h", "j", "k", "m", "n",
  "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"
];

const factors: number[] = [
  0x055c3050, // 41*40*39*38*37
  0x02b24b00, // 36*35*34*33*32
  0x1f990650, // 31*30*29*28*27*26
  0x0799adc0, // 25*24*23*22*21*20
  0x0f230dc0, // 19*18*17*16*15*14*13
  0x1c8cfc00  // 12*11*10*9*8*7*6*5*4*3*2*1
];

/**
 * Shuffle the encoding alphabat using the Fisher-Yates algorithm and the
 * provided seed.
 * @param {?ArrayBuffer} seed The seed value.
 * @returns {string[]} The shuffled encoding alphabet.
 */
function shuffleAlphabet(seed?: ArrayBuffer): string[] {
  const chars = alphabet.slice(0);
  if (seed) {
    const source = new DataView(seed);
    let mod = 41;
    let value: number;
    let n: number;
    let swap: string;
    factors.forEach((range, i) => {
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
 * @param {number} value The value to encode.
 * @param {string[]} chars The encoding characters.
 * @param {?number} length The target output length.
 * @returns {string} The encoded value.
 */
function encodeNumber(value: number, chars: string[], length: number = 0): string {
  let n: number;
  let result = "";
  for (let i = 0; length === 0 && value > 0 || i < length; i++) {
    if (value) {
      n = value % 41;
      value = Math.floor(value / 41);
    } else {
      n = 0;
    }
    result += chars[n];
  }
  return result;
}

/**
 * Encode a bigint value (maximum 64 bits).
 * @param {bigint} value The value to encode.
 * @param {string[]} chars The encoding characters.
 * @param {?number} length The target output length.
 * @returns {string} The encoded value.
 */
function encodeBigInt(value: bigint, chars: string[], length: number = 0): string {
  let n: number;
  let result = "";
  for (let i = 0; length === 0 && value > 0n || i < length; i++) {
    if (value) {
      n = Number(value % 41n);
      value /= 41n;
    } else {
      n = 0;
    }
    result += chars[n];
  }
  return result;
}

/**
 * Restore a `number` value from raw decoded data.
 * @param {Uint8Array} values Raw values to be restored.
 * @returns {number} Restored value.
 */
function restoreNumber(values: Uint8Array): number {
  let i = values.length - 1;
  let n = values[i--];
  while (i >= 0) {
    n *= 41;
    n += values[i--];
  }
  return n;
}

/**
 * Restore a `bigint` value from raw decoded data.
 * @param {Uint8Array} values Raw values to be restored.
 * @returns {bigint} Restored value.
 */
function restoreBigInt(values: Uint8Array): bigint {
  let i = values.length - 1;
  let n = BigInt(values[i--]);
  while (i >= 0) {
    n *= 41n;
    n += BigInt(values[i--]);
  }
  return n;
}

/**
 * Provides base41 `encode` and `decode` functions, optionally using a shuffled
 * encoding alphabet.
 */
export class KeymaskEncoder {
  private chars: string[];

  /**
   * Create a new `KeymaskEncoder` using the provided `seed`. If provided, the
   * `seed` will be used to shuffle the encoding alphabet.
   * @param {?ArrayBuffer} seed The seed value.
   */
  constructor(seed?: ArrayBuffer) {
    this.chars = shuffleAlphabet(seed ? clampBuffer(seed, 24) : seed);
  }

  /**
   * Encode the given value as base41.
   * @param {number | bigint | ArrayBuffer} value The value to encode.
   * @param {?number} length The target output length in characters. For inputs
   * greater than 64 bits, this applies to the final encoding block.
   * @returns {string} The encoded value.
   */
  encode(value: number | bigint | ArrayBuffer, length?: number): string {
    if (typeof value === "number") {
      return encodeNumber(value, this.chars, length);

    } else if (typeof value === "bigint") {
      if (value >= blockLimit) {
        let result = "";
        let next: bigint;
        while (value > 0n) {
          next = value / blockLimit;
          result += encodeBigInt(
            value % blockLimit, this.chars, next > 0n ? 12 : length
          );
          value = next;
        }
        return result;
      }
      return encodeBigInt(value, this.chars, length);
    }
    value = padBuffer(value, 8);
    const data = new DataView(value);
    const last = Math.ceil(value.byteLength / 8) - 1;
    let result = "";
    for (let i = 0; i <= last; i++) {
      result += encodeBigInt(
        data.getBigUint64(i * 8, true), this.chars, i < last ? 12 : length
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

    if (length <= 10 && !bigint) {
      return restoreNumber(values);

    } else if (length <= 12) {
      return restoreBigInt(values);

    } else {
      values = new Uint8Array(padBuffer(values.buffer, 12));
      const output = new ArrayBuffer(Math.round(values.byteLength * 2 / 3));
      const data = new DataView(output);
      for (let i = 0, j = 0; i < output.byteLength; i += 8, j += 12) {
        data.setBigUint64(i, restoreBigInt(values.slice(j, j + 12)), true);
      }
      if (bigint) {
        return toBigInt(data);
      }
      return data.buffer;
    }
  }
}