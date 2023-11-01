import { Base41 } from "./index";
import { Generator } from "./index";

export interface KeymaskOptions {
  seed?: ArrayBufferLike | ArrayBufferView;
  outputs?: number | number[];
  bigint?: boolean;
}

export class Keymask {
  private base41: Base41;
  private generator: Generator;

  constructor(options?: KeymaskOptions) {
    options = options || {};

    let seed = options.seed;
    if (seed && seed.byteLength > 7) {
      if (ArrayBuffer.isView(seed)) {
        seed = seed.buffer;
      }
      if (seed.byteLength < 24) {
        this.generator = new Generator(seed.slice(0, 8), options.bigint);
        delete options.seed;

      } else if (seed.byteLength < 32) {
        this.generator = new Generator(void 0, options.bigint);
        options.seed = seed.slice(0, 24);

      } else {
        this.generator = new Generator(seed.slice(0, 8), options.bigint);
        options.seed = seed.slice(8, 32);
      }
    } else {
      this.generator = new Generator(void 0, options.bigint);
      if (seed) {
        delete options.seed;
      }
    }
    this.base41 = new Base41(options);
  }

  mask(value: number | bigint): string {
    const length = this.base41.encodingLength(value);
    const n = this.generator.next(value, length);
    return this.base41.encode(n, length);
  }

  unmask(value: string): number | bigint {
    const n = this.base41.decode(value);
    return this.generator.previous(n as (number | bigint), value.length);
  }
}