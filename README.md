# Keymask-Base41

[![Unit Tests](https://github.com/keymask/keymask-base41/actions/workflows/test.yml/badge.svg)](https://github.com/keymask/keymask-base41/actions/workflows/test.yml)

`Keymask-Base41` is a dependency-free Typescript/JavaScript utility that maps
integers up to 64 bits in length to compact, random-looking character strings.

Values are first transformed by a Linear Congruential Generator so as to
obfuscate the underlying number sequence, then the output is encoded using a
Base41 encoding scheme.

```
1 -> "FyFLmR"
2 -> "JwKVWj"
3 -> "XcCjDG"
```

The Keymask instance can be personalized using a 256-bit seed value. As long as
you keep this value secret, it will be extremely difficult for anyone who
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

**TL;DR:** Efficient, URL-safe, free of visualy similar characters, extremely
unikely to form recognizable words or phrases.

Base41 is a highly efficient encoding for 16-, 32- and 64-bit values,
comparable to Base57 or Base85 in this respect. Whereas Base85 encodes 64 bits
to 10 characters, Base41 requires 12 characters. (Note that the decimal
representation of a 64-bit value requires 20 characters and the hexadecimal, 16
characters. It can therefore be said that Base41 is 25% more efficient than
hexadecimal and 40% more efficient than decimal, but 20% *less* efficient than
Base85.)

The primary advantage that Base41 holds over Base85 is that it is free of any
special characters, which makes it suitable for use in URLs or other places
where non-alphanumeric characters have special meanings or functions. Base85 is
more compact, but less versatile, as its output will sometimes need to be
further encoded or escaped. Base85 encodings are also more difficult to
communicate verbally.

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
`Base41` (the encoder). The LCG and encoder can be used independently of each
other if need be. However, the main `Keymask` class presents a simple unified
interface to the supporting classes and will typically be all you need.

The `Keymask` class constructor can be passed an object containing various
optional settings, described below. The default constructor will create an
instance that encodes variable-length outputs (the output length will depend on
the magnitude of the input value), while decoded values will be returned as
either a `number` or a `bigint`, depending again on the magnitude of the value.

**Example**

```JavaScript
import { Keymask } from "keymask-base41";

const keymask = new Keymask();

const masked = keymask.mask(123456789);
const unmasked = keymask.unmask(masked);

console.log(masked); // "wMjMGR"
console.log(unmasked); // 123456789
```

### `seed`

If a seed value is provided, it will be used to initialize the LCG and/or
shuffle the Base41 encoding alphabet. The value must be either an `ArrayBuffer`
or an `ArrayBufferView`. Typically, it should be `32` bytes long, as this
allows both the LCG and the Base41 encoding to be customized. If it is longer
than `32` bytes, only the first `32` bytes will be used.

If the seed is *less* than `32` bytes, then only one or the other of the LCG or
the Base41 encoding will be seeded: if the seed is less than `24` bytes, then
the first `8` bytes will be used to initialize the LCG; if it is between `24`
and `31` bytes, then the first `24` bytes will be used to shuffle the Base41
encoding alphabet. Seeds less than `8` bytes long will be ignored.

Providing a full, randomized `32`-byte `seed` is highly recommended, as it
means the mappings between inputs and outputs will be extremely difficult to
predict. If possible, the `seed` should be kept secret. However, it should
generally not change for the lifetime of your application (doing so would make
it impossible to unmask previously masked values).

**Example**

```JavaScript
import { Keymask } from "keymask-base41";

const keymask = new Keymask({
  seed: new Uint8Array([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32
  ])
});

const masked = keymask.mask(123456789);
const unmasked = keymask.unmask(masked);

console.log(masked); // "KbxsJQ"
console.log(unmasked); // 123456789

```

### `outputs`

The output length(s) can be explicitly defined by providing a number or an
array of numbers to the `outputs` option. If it is a single number, it defines
the minimum output length; values that exceed this minimum length will scale
automatically, with additional characters added as needed.

If an array of numbers is provided, they will define successive allowable
output lengths. If the highest provided output length is less than 12, longer
outputs will scale automatically, as above. If you do not want this
auto-scaling behavior, be sure to include `12` as the last value in the array.

Output lengths must be between 1 and 12. Other values will either be ignored
or clamped to this range.

Providing a minimum output length is generally recommended, because short
sequences are easier to reverse-map and may leak information about your
`Keymask` instance. For example, with no minimum defined, the first 40
sequential integers (1...40) will all map to 1-character keymasks. Although
these will be pseudo-randomized by the LCG and the shuffled encoding alphabet,
the fact that they are all 1 character long may allow information about your
seed to be deduced by anyone who is able to observe a series of values.

This setting should generally not be changed for the lifetime of your
application, as this can interfere with the ability to unmask previously
masked values.

**Example**

```JavaScript
import { Keymask } from "keymask-base41";

const keymask = new Keymask({
  outputs: [6, 9]
});

const masked = keymask.mask(12);
const unmasked = keymask.unmask(masked);

console.log(masked); // "pKJhNV"
console.log(unmasked); // 12
```

### `bigint`

Normally, the return type of the `unmask` operation will depend on the encoding
range (11- or 12-character encodings will be unmasked as a `bigint`). If you
want *all* values to be returned as a `bigint`, regardless of their magnitude,
then supply the option `bigint: true`.

**Example**

```JavaScript
import { Keymask } from "keymask-base41";

const keymask = new Keymask({
  bigint: true
});

const masked = keymask.mask(123456789n);
const unmasked = keymask.unmask(masked);

console.log(masked); // "wMjMGR"
console.log(unmasked); // 123456789n
```

## Performance

Both the Linear Congruential Generator and the Base41 encoding are extremely
simple operations, with execution times measured in microseconds or fractions
of a microsecond. In most systems, there is very little chance that Keymask
computations will form a significant bottleneck (provided you are processing
less than ~1 million per second).

On commodity hardware (2020 M1 Macbook Air), a single invocation of
`Keymask.mask()` takes on the order of 20 microseconds (irrespective of output
length), whereas a tight loop of one million invocations takes an average of
between 0.2 and 0.7 microseconds per call (strongly dependent on the output
length). As is often the case, performance characteristics differ substantially
depending on whether or not the code is being executed by the JIT compiler.

For best performance, the `Keymask` class instance should be cached for
repeated usage.
