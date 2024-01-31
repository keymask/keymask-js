import { KeymaskEncoder } from "./KeymaskEncoder";
import { KeymaskGenerator } from "./KeymaskGenerator";
import { padBuffer, toBigInt, toBuffer } from "./bufferUtils";

const limits12: bigint[] = [
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

const limits14: bigint[] = [
  0n,
  23n,
  509n,
  8191n,
  262139n,
  4194301n,
  134217689n,
  4294967291n,
  68719476731n,
  2199023255531n,
  35184372088777n,
  1125899906842597n,
  36028797018963913n,
  576460752303423433n,
  18446744073709551557n
];

/**
 * Determine the encoding length of the provided value.
 * @param {number | bigint} value The value to be encoded.
 * @param {number[]} sizes The available encoding lengths.
 * @param {number} block The encoding block size.
 * @returns {number} The smallest available encoding length.
 */
function encodingLength(value: number | bigint, sizes: number[], block: number): number {
  const limits = block === 12 ? limits12 : limits14;
  let length = block;
  let size = 0;
  value = typeof value === "bigint" ? value : BigInt(value);
  for (let i = 0; i < sizes.length; i++) {
    size = sizes[i];
    if (value < limits[size]) {
      length = size;
      break;
    }
  }
  if (length === block && value >= limits[size]) {
    for (let i = sizes[sizes.length - 1] + 1; i < block; i++) {
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
  safe?: boolean;
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
   * @property {?boolean} safe Use safe mode (Base24 encoding, no uppercase letters).
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
      this.generator = new KeymaskGenerator(options.seed, options.safe);

    } else if (options.seed) {
      this.encoder = new KeymaskEncoder(options.seed, options.safe);
      this.generator = new KeymaskGenerator(
        options.seed.byteLength < (options.safe ? 20 : 32)
          ? void 0
          : options.seed.slice(options.safe ? 12 : 24),
        options.safe
      );
    } else {
      this.encoder = new KeymaskEncoder(void 0, options.safe);
      this.generator = new KeymaskGenerator(void 0, options.safe);
    }

    const sizes = options.size;
    const max = this.encoder.block;
    if (Array.isArray(sizes)) {
      this.sizes = sizes
        .filter((size) => size > 0 && size <= max)
        .sort((a, b) => a - b);
    } else {
      this.sizes = [sizes && sizes > 0 && sizes <= max ? sizes : 1];
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
      length = encodingLength(data.getBigUint64(final, true), this.sizes, this.encoder.block);
      for (let i = 0; i < value.byteLength; i += 8) {
        data.setBigUint64(
          i,
          this.generator.next(
            data.getBigUint64(i, true),
            i < final ? this.encoder.block : length,
            true) as bigint,
          true
        );
      }
      return this.encoder.encode(data.buffer, length);
    } else {
      if (typeof value === "string") {
        value = BigInt(value);
      }
      length = encodingLength(value, this.sizes, this.encoder.block);
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
    const block = this.encoder.block;
    if (result instanceof ArrayBuffer) {
      const data = new DataView(result);
      const length = value.length % block || block;
      const final = result.byteLength - 8;
      for (let i = 0; i <= final; i += 8) {
        data.setBigUint64(
          i,
          this.generator.previous(
            data.getBigUint64(i, true),
            i < final ? block : length,
            true) as bigint,
          true
        );
      }
      if (
        this.type === "bigint" ||
        this.type === "string" ||
        this.type === "integer" && this.generator.bigIntOutput(value.length)
      ) {
        const n = toBigInt(data);
        return (this.type === "string" ? n.toString() : n) as KeymaskValue<T>;
      }
      if (length < block) {
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

/**
 * `StrictKeymask` extends the base `Keymask` class, forcing the `safe: true`
 * option, while also preventing the first character of a keymask from being a
 * number (replacing it with a vowel if present).
 */
export class StrictKeymask<T extends KeymaskType> extends Keymask<T> {

  constructor(options?: KeymaskOptions<T>) {
    super({ ...options, safe: true });
  }

  mask(value: KeymaskData): string {
    const result = super.mask(value);
    const first = result.charAt(0);
    return first === "5"
      ? "e" + result.substring(1)
      : first === "9"
        ? "i" + result.substring(1)
        : first === "7"
          ? "o" + result.substring(1)
          : first === "2"
            ? "u" + result.substring(1)
            : result;
  }

  unmask(value: string): KeymaskValue<T> {
    const first = value.charAt(0);
    return super.unmask(
      first === "e"
        ? "5" + value.substring(1)
        : first === "i"
          ? "9" + value.substring(1)
          : first === "o"
            ? "7" + value.substring(1)
            : first === "u"
              ? "2" + value.substring(1)
              : value
    );
  }
}