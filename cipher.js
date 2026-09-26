const { Transform } = require("stream");

const UPPER_A = 65;
const UPPER_Z = 90;
const LOWER_A = 97;
const LOWER_Z = 122;
const ALPHABET_LENGTH = 26;

class CaesarCipherTransform extends Transform {
  /**
   * @param {number} key
   */
  set key(key) {
    this._key = key;
  }

  /**
   * @param {Buffer} chunk
   * @param {BufferEncoding} _encoding
   * @param {import("stream").TransformCallback} callback
   */
  _transform(chunk, _encoding, callback) {
    this.push(cipherBuffer(chunk, this._key));
    callback();
  }
}

function normalizeShift(key) {
  return ((key % ALPHABET_LENGTH) + ALPHABET_LENGTH) % ALPHABET_LENGTH;
}

/**
 * Shift a character code by an already-normalized shift (0 - 25)
 *
 * @param {number} code
 * @param {number} shift
 */
function shiftNormalized(code, shift) {
  if (code >= UPPER_A && code <= UPPER_Z) {
    return UPPER_A + ((code - UPPER_A + shift) % ALPHABET_LENGTH);
  }

  if (code >= LOWER_A && code <= LOWER_Z) {
    return LOWER_A + ((code - LOWER_A + shift) % ALPHABET_LENGTH);
  }

  return code;
}

function shiftCode(code, key) {
  return shiftNormalized(code, normalizeShift(key));
}

function cipherString(str, key) {
  const shift = normalizeShift(key);
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(shiftNormalized(str.charCodeAt(i), shift));
  }
  return result;
}

function cipherBuffer(buffer, key) {
  const shift = normalizeShift(key);
  return buffer.map((byte) => shiftNormalized(byte, shift));
}

function crackString(str) {
  const results = [];
  for (let shift = 1; shift < ALPHABET_LENGTH; shift++) {
    results.push({
      shift,
      text: cipherString(str, -shift),
    });
  }
  return results;
}

module.exports = {
  CaesarCipherTransform,
  cipherBuffer,
  cipherString,
  crackString,
  normalizeShift,
  shiftCode,
};
