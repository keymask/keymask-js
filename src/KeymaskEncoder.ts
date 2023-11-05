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

function shuffleAlphabet(seed?: ArrayBufferLike): string[] {
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

export class KeymaskEncoder {
  private chars: string[];

  constructor(seed?: ArrayBufferLike | ArrayBufferView) {
    if (ArrayBuffer.isView(seed)) {
      seed = seed.buffer;
    }
    if (seed && seed.byteLength !== 24) {
      const seedBuffer = new ArrayBuffer(24);
      new Uint8Array(seedBuffer).set(new Uint8Array(seed.slice(0, 24)));
      seed = seedBuffer;
    }
    this.chars = shuffleAlphabet(seed);
  }

  encode(value: number | bigint, length: number): string {
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

  decode(value: string): number | bigint {
    const raw = new Uint8Array(value.length);

    for (let i = 0; i < raw.length; i++) {
      raw[i] = this.chars.indexOf(value.charAt(i));
    }

    let i = raw.length - 1;
    let n: number | bigint;

    if (value.length < 11) {
      n = raw[i--];
      while (i >= 0) {
        n *= 41;
        n += raw[i--];
      }

    } else {
      n = BigInt(raw[i--]);
      while (i >= 0) {
        n *= 41n;
        n += BigInt(raw[i--]);
      }
    }

    return n;
  }
}