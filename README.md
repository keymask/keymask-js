# Keymask (JavaScript)

[![Unit Tests](https://github.com/keymask/keymask-js/actions/workflows/test.yml/badge.svg)](https://github.com/keymask/keymask-js/actions/workflows/test.yml) [![npm](https://img.shields.io/npm/v/keymask)](https://www.npmjs.com/package/keymask)

`Keymask` maps integers and binary values of any length to and from compact,
random-looking character strings.

```
1 -> "FyFLmR"
2 -> "JwKVWj"
3 -> "XcCjDG"
```

Values are first transformed by a Linear Congruential Generator (a fast,
reversible pseudo-random number generator), then the result is encoded using a
URL-safe character encoding. Minimum output length(s) can be specified,
otherwise the keymask length will scale as needed. Each instance can be
personalized using a unique seed value, resulting in unique keymask mappings.

There are two modes of operation. The standard mode encodes each 32 bits to 6
characters, using a base-41 encoding scheme. Since this uses a mix of uppercase
and lowercase letters, it is only suitable when case-sensitivity can be
guaranteed. The more restrictive "safe" mode encodes each 32 bits to 7
characters using a base-24 encoding scheme. This can be used in
case-insensitive settings, such as a hostname or subdomain.

## Motivation

When serial numbers or sequential database IDs are displayed publicly, they can
leak information about system internals, such as how old a given record is, or
the frequency of record creation.

`Keymask` encodes serial numbers in such a way that they can be displayed to
end users without revealing these kinds of details. Since they are meant to be
displayed publicly, measures are taken to avoid potentially offensive character
combinations (by omitting vowels from its encoding alphabet, `Keymask`
generally does not output recognizable words of any kind).

## Installation

Releases are published to `npm` as `keymask`. Install the package normally
using your preferred package manager (`npm i keymask`, `yarn add keymask`,
`pnpm add keymask`, etc).

## Usage

The module exports three classes, `Keymask`, `KeymaskGenerator` (the LCG) and
`KeymaskEncoder` (the character encoder). These can be used independently of
each other, but for simple use cases, the main `Keymask` class is typically all
you need.

**Example (Default settings)**

```JavaScript
import { Keymask } from "keymask";

const keymask = new Keymask();

const masked = keymask.mask(123456789); // "wMjMGR"
const unmask = keymask.unmask("wMjMGR"); // 123456789
```

## Options

```Typescript
type KeymaskOptions = {
  seed?: ArrayBuffer;
  size?: number | number[];
  safe?: boolean;
  type?: "number" | "bigint" | "string" | "integer" | "buffer";
  encoder?: KeymaskEncoder;
};
```

### `seed`

If a `seed` value is provided, it will be used to initialize LCG offsets
and shuffle the encoding alphabet. This allows different `Keymask` instances to
produce completely different outputs.

The `seed` should be provided as an `ArrayBuffer`, and should be 32 bytes long
for standard mode, or 20 bytes for safe mode. Note, however, that if a
preconfigured `KeymaskEncoder` is used (see `encoder` option below), then the
seed supplied to the `Keymask` constructor only needs to be 8 bytes long.

Providing a randomized `seed` is highly recommended, as this makes the mappings
between inputs and outputs relatively unpredictable. Note that the `seed`
should typically not change for the lifetime of your application, as this would
render it impossible to unmask previously masked values.

**Example (Seeded)**

```JavaScript
import { Keymask } from "keymask";

const keymask = new Keymask({
  seed: new Uint8Array([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32
  ]).buffer
});

const masked = keymask.mask(123456789); // "ycQXDm"
const unmask = keymask.unmask("ycQXDm"); // 123456789
```

### `size`

The output length(s) can be specified by providing a number or an array of
numbers to the `size` option. If a single number is provided, it defines the
*minimum* output length; values that exceed this minimum length will scale
automatically, with additional characters added as needed.

If an array of numbers is provided, they represent successive allowable output
lengths. If the highest provided `size` is less than `12` (`14` in safe mode),
then longer outputs will scale automatically, as above. If you do not want
this auto-scaling behavior, be sure to include `12` ( or `14` in safe mode) as
the last value in the `size` array.

Note that long inputs (greater than 64 bits) are processed in 64-bit blocks,
and the `size` setting applies only to the final block. If your inputs are
word-aligned (to some multiple of 64 bits), it is generally recommended to
provide the setting `size: 12` (or `size: 14` in safe mode), as this will
ensure that unmasked values are always a multiple of 64 bits long, even when
the final block happens to contain a value that can be encoded in fewer
characters.

This setting should generally not be changed for the lifetime of your
application, as this may interfere with the ability to unmask previously masked
values.

**Example (Defined output lengths)**

```JavaScript
import { Keymask } from "keymask";

const keymask = new Keymask({
  size: [5, 10]
});

const masked = keymask.mask(123456789); // "xMMJdmtCcf"
const unmask = keymask.unmask("xMMJdmtCcf"); // 123456789
```

### `safe`

Safe mode is triggered using a boolean flag on the options object.

**Example (Safe mode)**

```JavaScript
import { Keymask } from "keymask";

const keymask = new Keymask({
  safe: true
});

const masked = keymask.mask(123456789); // "mfwbdg"
const unmask = keymask.unmask("mfwbdg"); // 123456789
```

### `type`

By default, `Keymask` unmasks values as a `number` when possible, while larger
values, up to 64 bits, will unmask to a `BigInt` and above 64 bits they will be
returned as an `ArrayBuffer`. Since there is no way of knowing in advance how
long the supplied keymask will be, the return type is a union type:

```TypeScript
type KeymaskData = number | bigint | string | ArrayBuffer;
```

There may well be times when you know the expected return type in advance, or
you want to cast the result to a specified type. In such cases, you can supply
the expected or desired type using the `type` option. If provided, it must
conform to one of the following strings (otherwise it will fall back to the
default behavior).

- `"number"` The result will be returned optimistically as a `number` type (no
type conversion is done, so type safety is not guaranteed; be sure to only use
this with short keymasks).
- `"bigint"` The result will be converted to a `BigInt` regardless of its
magnitude.
- `"string"` The result will be converted to a `BigInt` then cast to a `string`
regardless of its magnitude.
- `"integer"` Similar to the default behaviour, but values larger than 64 bits
will be returned as a `BigInt` rather than an `ArrayBuffer`. The return type is
`number | bigint`.
- `"buffer"` The result will be converted to an `ArrayBuffer` regardless of its
magnitude.

**Example (Specify the return type)**

```JavaScript
import { Keymask } from "keymask";

const defaultKeymask = new Keymask();
const numberKeymask = new Keymask({ type: "number" });
const bigintKeymask = new Keymask({ type: "bigint" });
const stringKeymask = new Keymask({ type: "string" });
const bufferKeymask = new Keymask({ type: "buffer" });

const unmask1 = defaultKeymask.unmask("wMjMGR"); // 123456789 as KeymaskData
const unmask2 = numberKeymask.unmask("wMjMGR"); // 123456789 as number
const unmask3 = bigintKeymask.unmask("wMjMGR"); // 123456789n as bigint
const unmask4 = stringKeymask.unmask("wMjMGR"); // "123456789"
const unmask5 = bufferKeymask.unmask("wMjMGR");
// [21, 205, 91, 7, 0, 0, 0, 0] as ArrayBuffer
```

### `encoder`

It is not uncommon for an application to employ multiple serial numbers (for
example, multiple database tables with auto-incrementing primary keys). In such
cases, it may be desirable to have each of them map to a unique keymask
sequence.

One way of doing this is to create multiple `Keymask` instances, each with a
unique 256-bit seed. A more efficient alternative is to have all of the
instances share a single `KeymaskEncoder`. The encoder can be seeded once
(requires a single 192-bit seed) and passed into each `Keymask` instance.
Consequently, each instance only requires an additional 64-bit (8-byte) seed to
customize the LCG offsets.

**Example (Multiple instances with a shared encoder)**

```JavaScript
import { Keymask, KeymaskEncoder } from "keymask";

const sharedEncoder = new KeymaskEncoder(new Uint8Array([
  1, 2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23, 24
]).buffer);

const keymask1 = new Keymask({
  encoder: sharedEncoder,
  seed: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).buffer,
  size: 5
});

const keymask2 = new Keymask({
  encoder: sharedEncoder,
  seed: new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88]).buffer,
  size: 5
});

const mask1a = keymask1.mask(1); // "yBtrf"
const mask1b = keymask1.mask(2); // "qTvWY"
const mask1c = keymask1.mask(3); // "ZkgVt"

const mask2a = keymask2.mask(1); // "tHHCd"
const mask2b = keymask2.mask(2); // "LWLzR"
const mask2c = keymask2.mask(3); // "xfQkX"
```

## Why Base 41?

Base41 is a highly efficient encoding for 16-, 32- and 64-bit values,
comparable to Base57 or Base85 in this respect. Whereas Base85 encodes 32 bits
to 5 ASCII characters, Base41 requires 6 characters. For comparison, the
decimal representation of a 32-bit value requires 10 characters and the
hexadecimal, 8 characters. It can therefore be said that Base41 is 25% more
efficient than hexadecimal and 40% more efficient than decimal, but 20% *less*
efficient than Base85.

The primary advantage that Base41 holds over Base85 is that it is free of
special characters, making it suitable for use in URLs or anywhere else that
non-alphanumeric characters have special meanings or functions. Raw Base85 is
more compact, but in certain situations its output may need to be further
encoded or escaped, negating its size advantage. For example, the URL-encoded
version of `d%E[q2^hjU` is `d%25E%5Bq2%5EhjU` which uses 16 characters to
represent a 64-bit value, the same as hexadecimal.

For its part, Base57 (or the somewhat more common Base58) is also free of
special characters, therefore URL-safe. However, since it includes virtually
the full range of alphanumeric ASCII characters, encoded values can
inadvertently contain recognizable words, phrases or slang, including
potentially offensive language. For example, the Base58 encoding of `0x949545`
is `rude`, and, needless to say, there are even ruder examples. Although such
instances are statistically rare, it may be preferable not to display them to
end-users.

Dropping down to Base41 allows us to remove all vowels and numerals from the
encoding alphabet, which makes it virtually impossible to generate crude or
otherwise offensive character combinations. The encoding is therefore both
URL-safe and "safe for all audiences". In addition, it is free of commonly
confused character sets, including `O` / `0` and `l` / `I` / `1`.

## Why Base 24?

The motivating use case for the "safe" mode is URL subdomains, as this portion
of the URL is case-insensitive. Thus, we only have 36 characters at our
disposal (the lowercase Latin ASCII alphabet and the 10 numerals). Base41 is
therefore not an option.

If we are to maintain the "safe for all audiences" standard, we must remove the
five vowels and any numbers that are commonly substituded for vowels in 1337
speak, pagercode and similar conventions. These include `0` for `o`, `1` for
`i`, `3` for `e`, and, depending on dialect, `4`, `6` or `8` for `a`, leaving
a maximum of 25-27 encoding characters.

Efficient encodings for 64-bit values include Base31 (13 characters per 64
bits) and Base24 (14 characters per 64 bits), and, given the above, the latter
is the most efficient encoding that can be used. Keymask's "safe" encoding
alphabet therefore consists of the lowercase Latin alphabet, minus the five
vowels and the letter `l`, plus the numbers `2`, `5`, `7` and `9`.

## Performance

On commodity hardware (2020 M1 Macbook Air), a single invocation of
`Keymask.mask()` (JIT-compiled) takes on the order of 10 microseconds, whereas
a tight loop of one million invocations takes an average of between 0.2 and 0.6
microseconds per call (for inputs up to 64 bits long). This amounts to well
over a million keymasks per second.

For best performance, the `Keymask` class instance should be cached for
repeated usage.
