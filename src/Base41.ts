const alphabet: string[] = [
  "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N",
  "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z",
  "b", "c", "d", "f", "g", "h", "j", "k", "m", "n",
  "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"
];

const factors: number[] = [
  0x380fb34cb80, // 41*40*39*38*37*36*35*34
  0x082573a0a00, // 33*32*31*30*29*28*27*26
  0xac9c3006800, // 25*24*23*22*21*20*19*18*17*16
  0x13077775800  // 15!
];

function shuffleAlphabet(seed?: ArrayBufferLike): string[] {
  const chars = alphabet.slice(0);

  if (seed) {
    const source = new Uint32Array(seed);
    const values = [
      source[0] * (source[1] & 0xffff),
      source[2] * (source[1] >>> 16),
      source[3] * (source[4] & 0xffff),
      source[5] * (source[4] >>> 16)
    ];

    let mod = 41;
    let range: number;
    let bits: number;
    let n: number;
    let swap: string;
    values.forEach((value, i) => {
      range = factors[i];
      bits = value % range;

      while (range > 1) {
        range /= mod--;
        n = Math.floor(bits / range);
        bits %= range;
        swap = chars[n];
        chars[n] = chars[mod];
        chars[mod] = swap;
      }
    });
  }

  return chars;
}

function restoreNumber(raw: Uint8Array): number {
  let i = raw.length - 1;
  let n = raw[i--];
  while (i >= 0) {
    n *= 41;
    n += raw[i--];
  }
  return n;
}

function restoreBigInt(raw: Uint8Array): bigint {
  let i = raw.length - 1;
  let n = BigInt(raw[i--]);
  while (i >= 0) {
    n *= 41n;
    n += BigInt(raw[i--]);
  }
  return n;
}

export class Base41 {
  private chars: string[];

  constructor(seed?: ArrayBufferLike | ArrayBufferView) {
    if (seed && seed.byteLength !== 24) {
      const seedBuffer = new ArrayBuffer(24);
      if (ArrayBuffer.isView(seed)) {
        seed = seed.buffer;
      }
      new Uint8Array(seedBuffer).set(new Uint8Array(seed.slice(0, 24)));
      seed = seedBuffer;
    }
    this.chars = shuffleAlphabet(ArrayBuffer.isView(seed) ? seed.buffer : seed);
  }

  private encodeValue(value: number | bigint, length: number): string {
    let n: number;
    let result = "";

    for (let i = 0; i < length; i++) {
      if (value) {
        if (typeof value === "bigint") {
          n = Number(value % 41n);
          value /= 41n;
        } else {
          n = value % 41;
          value = Math.floor(value / 41);
        }
      } else {
        n = 0;
      }

      result += this.chars[n];
    }

    return result;
  }

  encode(value: number | bigint | ArrayBufferLike | ArrayBufferView, length: number): string {
    let result = "";

    if (typeof value === "object") {
      if (ArrayBuffer.isView(value)) {
        value = value.buffer;
      }

      const blocks = new BigUint64Array(Math.ceil(value.byteLength / 8));
      new Uint8Array(blocks.buffer).set(new Uint8Array(value));

      const last = blocks.length - 1;
      blocks.forEach((block, index) => {
        result += this.encodeValue(
          block,
          index === last ? length : 12,
        );
      });

    } else {
      result = this.encodeValue(value, length);
    }

    return result;
  }

  private decodeValue(value: string, bigint: boolean = false): number | bigint {
    const raw = new Uint8Array(value.length);

    for (let i = 0; i < raw.length; i++) {
      raw[i] = this.chars.indexOf(value.charAt(i));
    }

    if (bigint) {
      return restoreBigInt(raw);
    }

    if (value.length < 11) {
      return restoreNumber(raw);
    }

    const b = restoreBigInt(raw);
    const n = Number(b);
    return n > Number.MAX_SAFE_INTEGER ? b : n;
  }

  decode(value: string): number | bigint | ArrayBufferLike {
    if (value.length <= 12) {
      return this.decodeValue(value);
    }

    const entries = Math.ceil(value.length / 12);
    const result = new BigUint64Array(entries);
    for (let i = 0; i < entries; i++) {
      result[i] = this.decodeValue(value.slice(i * 12, (i + 1) * 12), true) as bigint;
    }

    return result.buffer;
  }
}