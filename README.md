# Keymask-Base41

[![Unit Tests](https://github.com/keymask/keymask-base41/actions/workflows/test.yml/badge.svg)](https://github.com/keymask/keymask-base41/actions/workflows/test.yml)

`Keymask-Base41` is a dependency-free JavaScript (Typescript) utility that maps
integers up to 64 bits in length to compact, random-looking character strings.

Values are first transformed by a Linear Congruential Generator so as to
conceal the underlying number sequence, then the result is encoded using a
Base41 encoding scheme.

```
1 -> "FyFLmR"
2 -> "JwKVWj"
3 -> "XcCjDG"
```

The Keymask instance can be personalized using a 256-bit seed value. As long as
this value is kept secret, it will be extremely difficult for anyone who
doesn't know the seed to reverse map the encoded values.

## Motivation

Serial numbers and sequential database IDs are extremely convenient and useful,
however, when displayed publicly they can leak information about system
internals, such as how old a given record is, or the frequency of record
creation (see
["German tank problem"](https://search.brave.com/search?q=german+tank+problem)).

`Keymask-Base41` encodes serial numbers in such a way that they can be
displayed to end-users without revealing these kinds of details.

## Why Base41?

**TL;DR:** Efficient, URL-safe, free of visualy similar characters, virtually
impossible to form recognizable words or phrases.

Base41 is a highly efficient encoding for 16-, 32- and 64-bit values,
comparable to Base57 or Base85 in this respect. Whereas Base85 encodes 32 bits
to 5 characters, Base41 requires 6 characters. (Note that the decimal
representation of a 32-bit value requires 10 characters and the hexadecimal, 8
characters. It can therefore be said that Base41 is 25% more efficient than
hexadecimal and 40% more efficient than decimal, but 20% *less* efficient than
Base85.)

The primary advantage that Base41 holds over Base85 is that it is free of
special characters, which makes it suitable for use in URLs or anywhere else
that non-alphanumeric characters have special meanings or functions. Base85 is
more compact, but its output needs to be further encoded or escaped in such
settings, which negates its main benefit.

For its part, Base57 (or the somewhat more common Base58) is also free of
special characters, therefore URL-safe. However, since it includes virtually
the full range of alphanumeric characters, encoded values can inadvertently
contain recognizable words, phrases or slang, including potentially offensive
language. This can be problematic when the encoded values are associated with
human users (for example, a user id) and visible to them (for example, in the
URL of their public profile page).

Dropping down to Base41 allows us to remove all vowels and numerals from the
encoding alphabet, which makes it virtually impossible to generate crude or
otherwise offensive character combinations. It is therefore both URL-safe and
"safe for all audiences". In addition, it is free of commonly confused
character sets, including `O` / `0` and `l` / `I` / `1`.

## Installation

Install `keymask-base41` in the standard way, using your preferred package
manager (npm, yarn, pnpm...).

## Usage

The module exports three classes, `Keymask`, `Generator` (the LCG) and
`Base41` (the encoder). For basic use cases, the main `Keymask` class should be
all you need, as it provides a unified interface to the other two.

The `Keymask` class constructor can be passed an object containing various
optional settings, as outlined in the following sections. The default
constructor will create an instance that encodes variable-length outputs (the
output length will depend on the magnitude of the input value), and decoded
values will be returned as either a `number` or a `bigint`, depending again on
the magnitude of the value.

**Options**

```Typescript
type KeymaskOptions = {
  seed?: ArrayBufferLike | ArrayBufferView;
  size?: number | number[];
  bigint?: boolean;
  encoder?: Base41;
};
```

**Example (Default settings, no seed, variable outputs)**

```JavaScript
import { Keymask } from "keymask-base41";

const keymask = new Keymask();

const masked = keymask.mask(123456789); // "wMjMGR"
const unmasked = keymask.unmask(masked); // 123456789
```

### `seed`

If a `seed` value is provided, it will be used to initialize the LCG and/or
shuffle the Base41 encoding alphabet. The value must be either an `ArrayBuffer`
or an `ArrayBufferView`. Typically, it should be `32` bytes long, as this
allows both the LCG and the `Base41` encoding to be customized. If it is longer
than `32` bytes, only the first `32` bytes will be used.

Note, however, that if a preconfigured `Base41` encoder is provided to the
`Keymask` constructor (see `encoder` option below), the seed only needs to be
`8` bytes long, and will be used solely to customize the LCG `Generator`. In
this case, if more than `8` bytes are provided, only the first `8` bytes will
be used.

The `seed` should therefore be either `32` or `8` bytes long, depending on
whether a preconfigured `Base41` encoder is used. (Note that seeding the
encoder itself requires `24` bytes.)

Providing a randomized `seed` is highly recommended, as this makes the mappings
between inputs and outputs extremely difficult to predict (unless you know the
`seed`). If possible, the `seed` should be kept secret, and it should generally
not change for the lifetime of your application (doing so would make it
impossible to unmask previously masked values).

**Example (Seeded)**

```JavaScript
import { Keymask } from "keymask-base41";

const keymask = new Keymask({
  seed: new Uint8Array([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32
  ])
});

const masked = keymask.mask(123456789); // "KbxsJQ"
const unmasked = keymask.unmask(masked); // 123456789

```

### `size`

The output length(s) can be explicitly defined by providing a number or an
array of numbers to the `size` option. If a single number is provided, it will
define the *minimum* output length; values that exceed this minimum length will
scale automatically, with additional characters added as needed.

If an array of numbers is provided, they represent successive allowable output
lengths. If the highest provided `size` is less than `12`, then longer outputs
will scale automatically, as above. If you do not want this auto-scaling
behaviour, be sure to include `12` as the last value in the `size` array.

Output lengths must be between `1` and `12`. Other values will be ignored.

This setting should generally not be changed for the lifetime of your
application, as this may interfere with the ability to unmask previously masked
values.

**Example (Defined output lengths)**

```JavaScript
import { Keymask } from "keymask-base41";

const keymask = new Keymask({
  size: [6, 9]
});

const masked = keymask.mask(12); // "pKJhNV"
const unmasked = keymask.unmask(masked); // 12
```

### `bigint`

Normally, the return type of the `unmask` operation will depend on the encoding
range (11- or 12-character encodings will be unmasked as a `bigint`). If you
want *all* values to be returned as a `bigint`, regardless of their magnitude,
then supply the option `bigint: true`.

**Example (BigInt outputs)**

```JavaScript
import { Keymask } from "keymask-base41";

const keymask = new Keymask({
  bigint: true
});

const masked = keymask.mask(123456789n); // "wMjMGR"
const unmasked = keymask.unmask(masked); // 123456789n
```

### `encoder`

It is not uncommon for an application to employ multiple serial numbers (for
example, multiple database tables with auto-incrementing primary keys). In such
cases, it may be desirable to have each of them map to a unique keymask
sequence.

One way of doing this is to create multiple `Keymask` instances, each with a
unique 256-bit seed. A more efficient alternative is to have all of the
instances share a single `Base41` encoder. The encoder can be seeded once
(requires a 192-bit seed) and passed into each `Keymask` instance. In
consequence, each instance only requires an additional 64-bit (8-byte) seed
to customize the LCG sequence.

**Example (Multiple instances with a shared encoder)**

```JavaScript
import { Base41, Keymask } from "keymask-base41";

const base41 = new Base41(new Uint8Array([
  1, 2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23, 24
]));

const keymask1 = new Keymask({
  encoder: base41,
  seed: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
  size: 5
});

const keymask2 = new Keymask({
  encoder: base41,
  seed: new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88]),
  size: 5
});

const mask1a = keymask1.mask(1); // "bgLtm"
const mask1b = keymask1.mask(2); // "FVyHP"
const mask1c = keymask1.mask(3); // "vrMZL"
const mask2a = keymask2.mask(1); // "LjjWh"
const mask2b = keymask2.mask(2); // "RHRkJ"
const mask2c = keymask2.mask(3); // "xmXrp"
```

## Performance

On commodity hardware (2020 M1 Macbook Air), a single invocation of
`Keymask.mask()` (JIT-compiled) takes on the order of 10 microseconds, whereas
a tight loop of one million invocations takes an average of between 0.2 and 0.6
microseconds per call (depending on the output length). This amounts to well
over a million keymasks per second.

For best performance, the `Keymask` class instance should be cached for
repeated usage.
