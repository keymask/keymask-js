import { KeymaskOptions } from "./index";

const alphabet: string[] = [
  "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N",
  "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z",
  "b", "c", "d", "f", "g", "h", "j", "k", "m", "n",
  "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"
];

const binaryLimits: bigint[] = [
  0n,
  32n,
  1024n,
  65536n,
  2097152n,
  67108864n,
  4294967296n,
  137438953472n,
  4398046511104n,
  281474976710656n,
  9007199254740992n,
  288230376151711740n,
  18446744073709552000n
];

const primeLimits: bigint[] = [
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

export interface Base41Options extends KeymaskOptions {
  prime?: boolean;
  pad?: boolean;
}

export class Base41 {
  private chars: string[];
  private outputs: number[];
  private limits: bigint[];
  private bigint: boolean;
  private fluid : boolean;
  private pad: boolean;

  constructor(options?: Base41Options) {
    options = options || {};

    const seed = options.seed;
    if (seed && seed.byteLength !== 24) {
      throw new RangeError("If seed is provided it must be 24 bytes long.");
    }
    this.chars = shuffleAlphabet(ArrayBuffer.isView(seed) ? seed.buffer : seed);

    const outputs = options.outputs;
    if (Array.isArray(outputs)) {
      this.fluid = false;
      this.outputs = outputs.filter((output) => output > 0 && output < 13).sort((a, b) => a - b);
    } else {
      this.fluid = true;
      this.outputs = [Math.min(Math.max(outputs || 1, 1), 12)];
    }

    this.bigint = !!options.bigint;
    this.limits = options.prime ? primeLimits : binaryLimits;
    this.pad = options.pad === undefined ? true : options.pad;
  }

  encodingLength(value: number | bigint): number {
    let length = 12;
    let output = 0;
    value = typeof value === "bigint" ? value : BigInt(value);
    for (let i = 0; i < this.outputs.length; i++) {
      output = this.outputs[i];
      if (value < this.limits[output]) {
        length = output;
        break;
      }
    }
    if (length === 12 && this.fluid || value >= this.limits[output]) {
      for (let i = this.outputs[0] + 1; i < 12; i++) {
        if (value < this.limits[i]) {
          length = i;
          break;
        }
      }
    }
    return length;
  }

  private encodeValue(value: number | bigint, length: number, pad: boolean): string {
    let n: number;
    let result = "";

    for (let i = 0; i < length; i++) {
      if (!pad && !value && i >= this.outputs[this.outputs.length - 1]) {
        break;
      }

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

  encode(value: number | bigint | ArrayBufferLike | ArrayBufferView, length?: number): string {
    let result = "";

    if (typeof value === "object") {
      if (ArrayBuffer.isView(value)) {
        value = value.buffer;
      }

      const values = new Uint8Array(value);
      const blocks = new BigUint64Array(Math.ceil(values.length / 8));
      const bytes = new Uint8Array(blocks.buffer);
      bytes.set(values);

      let final: boolean;
      blocks.forEach((block, index) => {
        final = index === blocks.length - 1;
        result += this.encodeValue(
          block, 
          final ? length || this.encodingLength(block) : 12, 
          !final || this.pad);
      });

    } else {
      result = this.encodeValue(value, length || this.encodingLength(value), this.pad);
    }

    return result;
  }

  private decodeValue(value: string, bigint: boolean = false): number | bigint {
    const raw = new Uint8Array(value.length);

    for (let i = 0; i < raw.length; i++) {
      raw[i] = this.chars.indexOf(value.charAt(i));
    }
    
    if (this.bigint || bigint) {
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