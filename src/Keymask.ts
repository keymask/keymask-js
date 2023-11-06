import { KeymaskEncoder } from "./KeymaskEncoder";
import { Generator } from "./Generator";

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

export type KeymaskOptions = {
  seed?: ArrayBufferLike | ArrayBufferView;
  size?: number | number[];
  bigint?: boolean;
  encoder?: KeymaskEncoder;
};

/**
 * Convert numeric values to and from pseudo-randomized character encodings.
 */
export class Keymask {
  private encoder: KeymaskEncoder;
  private generator: Generator;
  private sizes: number[];

  /**
   * Create a new `Keymask` instance using the provided options.
   * @param {object} options Keymask options.
   */
  constructor(options?: KeymaskOptions) {
    options = options || {} as KeymaskOptions;

    if (options.encoder) {
      this.encoder = options.encoder;
      this.generator = new Generator(options.seed, options.bigint);

    } else {
      let seed = options.seed;
      if (seed) {
        if (ArrayBuffer.isView(seed)) {
          seed = seed.buffer;
        }
        this.encoder = new KeymaskEncoder(seed.slice(0, 24));
        this.generator = new Generator(
          seed.byteLength < 32 ? void 0 : seed.slice(24),
          options.bigint
        );
      } else {
        this.encoder = new KeymaskEncoder();
        this.generator = new Generator(void 0, options.bigint);
      }
    }

    const sizes = options.size;
    if (Array.isArray(sizes)) {
      this.sizes = sizes.filter((size) => size > 0 && size < 13).sort((a, b) => a - b);
    } else {
      this.sizes = [sizes && sizes > 0 && sizes < 13 ? sizes : 1];
    }
  }

  /**
   * Mask the provided numeric value.
   * @param {number | bigint} value The value to mask.
   * @returns {string} The masked value.
   */
  mask(value: number | bigint): string {
    const length = encodingLength(value, this.sizes);
    const n = this.generator.next(value, length);
    return this.encoder.encode(n, length);
  }

  /**
   * Unmask the provided value.
   * @param {string} value The encoded value to unmask.
   * @returns {number | bigint} The unmasked numeric value.
   */
  unmask(value: string): number | bigint {
    const n = this.encoder.decode(value);
    return this.generator.previous(n, value.length);
  }
}