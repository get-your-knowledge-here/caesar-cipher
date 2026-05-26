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

function shiftCode(code, key) {
  const shift = normalizeShift(key);

  if (code >= UPPER_A && code <= UPPER_Z) {
    return UPPER_A + ((code - UPPER_A + shift) % ALPHABET_LENGTH);
  }

  if (code >= LOWER_A && code <= LOWER_Z) {
    return LOWER_A + ((code - LOWER_A + shift) % ALPHABET_LENGTH);
  }

  return code;
}

function cipherString(str, key) {
  return str
    .split("")
    .map((char) => String.fromCharCode(shiftCode(char.charCodeAt(0), key)))
    .join("");
}

function cipherBuffer(buffer, key) {
  return buffer.map((byte) => shiftCode(byte, key));
}

module.exports = {
  CaesarCipherTransform,
  cipherBuffer,
  cipherString,
};
