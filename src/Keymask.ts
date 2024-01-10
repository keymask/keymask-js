import { KeymaskEncoder } from "./KeymaskEncoder";
import { KeymaskGenerator } from "./KeymaskGenerator";
import { padBuffer, toBigInt, toBuffer } from "./bufferUtils";

const limits: bigint[] = [
  0n,
  41n,
  1021n,
  65521n,
  2097143n,
  67108859n,
  4294967291n,
  137438953447n,
  4398046511093n,
  281474976710597n,
  9007199254740881n,
  288230376151711717n,
  18446744073709551557n
];

/**
 * Determine the encoding length of the provided value.
 * @param {number | bigint} value The value to be encoded.
 * @param {number[]} sizes The available encoding lengths.
 * @returns {number} The smallest available encoding length.
 */
function encodingLength(value: number | bigint, sizes: number[]): number {
  let length = 12;
  let size = 0;
  value = typeof value === "bigint" ? value : BigInt(value);
  for (let i = 0; i < sizes.length; i++) {
    size = sizes[i];
    if (value < limits[size]) {
      length = size;
      break;
    }
  }
  if (length === 12 && value >= limits[size]) {
    for (let i = sizes[sizes.length - 1] + 1; i < 12; i++) {
      if (value < limits[i]) {
        length = i;
        break;
      }
    }
  }
  return length;
}

export type KeymaskData = number | bigint | string | ArrayBuffer;

export type KeymaskType = "number" | "bigint" | "string" | "integer" | "buffer" | undefined;

export type KeymaskValue<T extends KeymaskType> =
  T extends "number" ? number
  : T extends "bigint" ? bigint
  : T extends "string" ? string
  : T extends "integer" ? number | bigint
  : T extends "buffer" ? ArrayBuffer
  : KeymaskData;

export type KeymaskOptions<T extends KeymaskType> = {
  seed?: ArrayBuffer;
  size?: number | number[];
  type?: T;
  encoder?: KeymaskEncoder;
};

/**
 * Convert numeric values to and from pseudo-randomized sequences of characters.
 */
export class Keymask<T extends KeymaskType> {
  private encoder: KeymaskEncoder;
  private generator: KeymaskGenerator;
  private sizes: number[];
  private type: T;

  /**
   * @typedef {"number" | "bigint" | "integer" | "buffer" | undefined} KeymaskType
   */
  /**
   * @typedef {object} KeymaskOptions
   * @property {?ArrayBuffer} seed The seed value.
   * @property {?(number | number[])} size The minimum encoding size or allowable sizes.
   * @property {?KeymaskType} type Optionally specify the `unmask()` return type.
   * @property {?KeymaskEncoder} encoder Custom/shared `KeymaskEncoder` instance.
   */
  /**
   * Create a new `Keymask` instance using the provided options.
   * @param {?KeymaskOptions} options Keymask options.
   */
  constructor(options?: KeymaskOptions<T>) {
    options = options || {} as KeymaskOptions<T>;

    if (options.encoder) {
      this.encoder = options.encoder;
      this.generator = new KeymaskGenerator(options.seed);

    } else if (options.seed) {
      this.encoder = new KeymaskEncoder(options.seed.slice(0, 24));
      this.generator = new KeymaskGenerator(
        options.seed.byteLength < 32 ? void 0 : options.seed.slice(24)
      );
    } else {
      this.encoder = new KeymaskEncoder();
      this.generator = new KeymaskGenerator();
    }

    const sizes = options.size;
    if (Array.isArray(sizes)) {
      this.sizes = sizes
        .filter((size) => size > 0 && size < 13)
        .sort((a, b) => a - b);
    } else {
      this.sizes = [sizes && sizes > 0 && sizes < 13 ? sizes : 1];
    }

    this.type = options.type as T;
  }

  /**
   * Mask the provided value.
   * @param {number | bigint | string | ArrayBuffer} value The value to mask.
   * @returns {string} The masked value.
   */
  mask(value: KeymaskData): string {
    let length: number;
    if (value instanceof ArrayBuffer) {
      value = padBuffer(value.slice(0), 8);
      const data = new DataView(value);
      const final = value.byteLength - 8;
      length = encodingLength(data.getBigUint64(final, true), this.sizes);
      for (let i = 0; i < value.byteLength; i += 8) {
        data.setBigUint64(
          i,
          this.generator.next(
            data.getBigUint64(i, true),
            i < final ? 12 : length,
            true) as bigint,
          true
        );
      }
      return this.encoder.encode(data.buffer, length);
    } else {
      if (typeof value === "string") {
        value = BigInt(value);
      }
      length = encodingLength(value, this.sizes);
      return this.encoder.encode(
        this.generator.next(value, length),
        length
      );
    }
  }

  /**
   * Unmask the provided value.
   * @param {string} value The encoded value to unmask.
   * @returns {number | bigint | string | ArrayBuffer} The unmasked value.
   */
  unmask(value: string): KeymaskValue<T> {
    const result = this.encoder.decode(value);
    if (result instanceof ArrayBuffer) {
      const data = new DataView(result);
      const length = value.length % 12 || 12;
      const final = result.byteLength - 8;
      for (let i = 0; i <= final; i += 8) {
        data.setBigUint64(
          i,
          this.generator.previous(
            data.getBigUint64(i, true),
            i < final ? 12 : length,
            true) as bigint,
          true
        );
      }
      if (
        this.type === "bigint" ||
        this.type === "string" ||
        this.type === "integer" && value.length > 10
      ) {
        const n = toBigInt(data);
        return (this.type === "string" ? n.toString() : n) as KeymaskValue<T>;
      }
      if (length < 12) {
        const bytes = new Uint8Array(result);
        let end = result.byteLength - 1;
        while (end >= 0 && bytes[end] === 0) {
          end -= 1;
        }
        return result.slice(0, end + 1) as KeymaskValue<T>;
      }
      return result as KeymaskValue<T>;
    }
    const n = this.generator.previous(result, value.length, this.type === "bigint");
    return (
      this.type === "buffer" ? toBuffer(n)
        : this.type === "string" ? n.toString()
          : n
    ) as KeymaskValue<T>;
  }
}