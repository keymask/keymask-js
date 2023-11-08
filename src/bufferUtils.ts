export const blockLimit = BigInt("0x10000000000000000");

/**
 * Pad the given buffer with zeroes so that it is a multiple of `blockSize` bytes.
 * @param {ArrayBuffer} buffer The buffer to pad.
 * @param {number} blockSize The target block size.
 * @returns {ArrayBuffer} The zero-padded buffer.
 */
export function padBuffer(buffer: ArrayBuffer, blockSize: number): ArrayBuffer {
  if (buffer.byteLength % blockSize === 0) {
    return buffer;
  }
  const padded = new ArrayBuffer(Math.ceil(buffer.byteLength / blockSize) * blockSize);
  new Uint8Array(padded).set(new Uint8Array(buffer));
  return padded;
}

/**
 * Clamp the given buffer to the specified `size`, either truncating or padding
 * with zeroes as necessary.
 * @param {ArrayBuffer} buffer The source buffer.
 * @param {number} size The target size.
 * @returns {ArrayBuffer} The clamped buffer.
 */
export function clampBuffer(buffer: ArrayBuffer, size: number): ArrayBuffer {
  if (buffer.byteLength === size) {
    return buffer;
  }
  const clamped = new ArrayBuffer(size);
  new Uint8Array(clamped).set(new Uint8Array(buffer));
  return clamped;
}

/**
 * Convert raw binary data to a BigInt.
 * @param {DataView} data The binary data (must be a multiple of 8 bytes).
 * @returns {bigint} The equivalent BigInt value.
 */
export function toBigInt(data: DataView): bigint {
  let n = data.getBigUint64(data.byteLength - 8, true);
  for (let i = data.byteLength - 16; i >= 0; i -= 8) {
    n *= blockLimit;
    n += data.getBigUint64(i, true);
  }
  return n;
}