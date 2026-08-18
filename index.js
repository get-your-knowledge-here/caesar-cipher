"use strict";

const {
  CaesarCipherTransform,
  cipherBuffer,
  cipherString,
  crackString,
} = require("./cipher");
const {
  ensureValidForBuffer,
  ensureValidForString,
  ensureValidStringOnly,
  ensureValidKey,
} = require("./validate");

/**
 * Encrypt a string using Caesar Cipher
 *
 * @param {string} str
 * @param {number} key
 * @returns string
 */
function encryptString(str, key) {
  ensureValidForString(str, key);

  return cipherString(str, key);
}

/**
 * Decrypt a string using Caesar Cipher
 *
 * @param {string} str
 * @param {number} key
 * @returns string
 */
function decryptString(str, key) {
  ensureValidForString(str, key);

  return cipherString(str, -key);
}

/**
 * Perform ROT13 cipher on a string (shift by 13)
 *
 * @param {string} str
 * @returns string
 */
function rot13(str) {
  ensureValidStringOnly(str);

  return cipherString(str, 13);
}

/**
 * Brute-force crack all possible Caesar cipher shifts (1 through 25)
 *
 * @param {string} str Encrypted string
 * @returns {Array<{shift: number, text: string}>}
 */
function crack(str) {
  ensureValidStringOnly(str);

  return crackString(str);
}

/**
 * Alias for crack(str)
 *
 * @param {string} str Encrypted string
 * @returns {Array<{shift: number, text: string}>}
 */
const bruteForce = crack;

/**
 * Encrypt a buffer array using Caesar Cipher
 *
 * @param {Buffer} buffer
 * @param {number} key
 * @returns buffer
 */
function encrypt(buffer, key) {
  ensureValidForBuffer(buffer, key);
  return cipherBuffer(buffer, key);
}

/**
 * Decrypt a buffer array using Caesar Cipher
 *
 * @param {Buffer} buffer
 * @param {number} key
 * @returns buffer
 */
function decrypt(buffer, key) {
  ensureValidForBuffer(buffer, key);
  return cipherBuffer(buffer, -key);
}

class EncryptTransform extends CaesarCipherTransform {
  /**
   * Transform stream for encryption using Caesar Cipher
   *
   * @param {number} key Encryption key
   */
  constructor(key) {
    super();
    ensureValidKey(key);
    this.key = key;
  }
}

class DecryptTransform extends CaesarCipherTransform {
  /**
   * Transform stream for decryption using Caesar Cipher
   *
   * @param {number} key Decryption key
   */
  constructor(key) {
    super();
    ensureValidKey(key);
    this.key = -key;
  }
}

module.exports = {
  encrypt,
  decrypt,
  encryptString,
  decryptString,
  rot13,
  crack,
  bruteForce,
  EncryptTransform,
  DecryptTransform,
};

