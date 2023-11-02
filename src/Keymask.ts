import { Base41, Generator } from "./index";

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
  encoder?: Base41;
};

export class Keymask {
  private base41: Base41;
  private generator: Generator;
  private sizes: number[];

  constructor(options?: KeymaskOptions) {
    options = options || {} as KeymaskOptions;

    if (options.encoder) {
      this.base41 = options.encoder;
      this.generator = new Generator(options.seed, options.bigint);

    } else {
      let seed = options.seed;
      if (seed) {
        if (ArrayBuffer.isView(seed)) {
          seed = seed.buffer;
        }
        this.base41 = new Base41(seed.slice(0, 24));
        this.generator = new Generator(
          seed.byteLength < 32 ? void 0 : seed.slice(24),
          options.bigint
        );
      } else {
        this.base41 = new Base41();
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

  mask(value: number | bigint): string {
    const length = encodingLength(value, this.sizes);
    const n = this.generator.next(value, length);
    return this.base41.encode(n, length);
  }

  unmask(value: string): number | bigint {
    const n = this.base41.decode(value);
    return this.generator.previous(n as (number | bigint), value.length);
  }
}