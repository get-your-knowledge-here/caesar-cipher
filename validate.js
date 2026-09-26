const MAX_INPUT_LENGTH = 1000;

/**
 * Check for valid key
 *
 * @param {number} key Shift key
 */
function ensureValidKey(key) {
  if (key === undefined || key === null) {
    throw new TypeError("Key is required");
  }

  if (typeof key !== "number" || !Number.isInteger(key)) {
    throw new TypeError("Key should be an integer");
  }

  if (key < 0 || key > 25) {
    throw new RangeError("Key should be within the range of 0 - 25");
  }
}

/**
 * Check that input does not exceed the in-memory size limit
 *
 * @param {number} length Input length in characters or bytes
 */
function ensureWithinLimit(length) {
  if (length > MAX_INPUT_LENGTH) {
    throw new RangeError(
      "Input too large, use EncryptTransform / DecryptTransform instead"
    );
  }
}

/**
 * Validation for string input without key (rot13, crack, bruteForce)
 *
 * @param {String} str String input value
 */
function ensureValidStringOnly(str) {
  if (!str) {
    throw new TypeError("Str is required");
  }

  if (typeof str !== "string") {
    throw new TypeError("Str is invalid");
  }

  ensureWithinLimit(str.length);
}

/**
 * Validation for encryptString and decryptString
 *
 * @param {String} str String input value
 * @param {number} key Shift key
 */
function ensureValidForString(str, key) {
  ensureValidStringOnly(str);
  ensureValidKey(key);
}

/**
 * Validation for encrypt and decrypt functions
 *
 * @param {Buffer} buffer Buffer input value
 * @param {number} key Shift key
 */
function ensureValidForBuffer(buffer, key) {
  if (!buffer) {
    throw new TypeError("Buffer is required");
  }

  if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
    throw new TypeError("Buffer is invalid");
  }

  ensureWithinLimit(buffer.length);
  ensureValidKey(key);
}

module.exports = {
  MAX_INPUT_LENGTH,
  ensureValidKey,
  ensureValidForString,
  ensureValidForBuffer,
  ensureValidStringOnly,
};
