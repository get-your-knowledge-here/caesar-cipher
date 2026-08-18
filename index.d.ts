/// <reference types="node" />

import { Transform } from "stream";

/**
 * Result item returned by `crack` or `bruteForce`.
 */
export interface CrackResult {
  /** The shift amount (1 to 25) */
  shift: number;
  /** The resulting decrypted plaintext for this shift */
  text: string;
}

/**
 * Encrypt a string using the Caesar Cipher.
 *
 * @param str The string to encrypt (maximum 1000 characters).
 * @param key Shift key as an integer between 0 and 25.
 * @returns The encrypted string.
 * @throws {Error} If `str` is empty/invalid, exceeds 1000 characters, or `key` is not an integer in 0-25.
 */
export function encryptString(str: string, key: number): string;

/**
 * Decrypt a string using the Caesar Cipher.
 *
 * @param str The string to decrypt (maximum 1000 characters).
 * @param key Shift key as an integer between 0 and 25.
 * @returns The decrypted string.
 * @throws {Error} If `str` is empty/invalid, exceeds 1000 characters, or `key` is not an integer in 0-25.
 */
export function decryptString(str: string, key: number): string;

/**
 * Perform a ROT13 cipher on a string (Caesar shift of 13).
 *
 * @param str The string to encode/decode (maximum 1000 characters).
 * @returns The ROT13-transformed string.
 * @throws {Error} If `str` is empty/invalid or exceeds 1000 characters.
 */
export function rot13(str: string): string;

/**
 * Generate all 25 possible Caesar shift decryptions for a given ciphertext.
 *
 * @param str The ciphertext to brute-force crack (maximum 1000 characters).
 * @returns An array of 25 objects with `shift` and decrypted `text`.
 * @throws {Error} If `str` is empty/invalid or exceeds 1000 characters.
 */
export function crack(str: string): CrackResult[];

/**
 * Alias for `crack(str)`.
 *
 * @param str The ciphertext to brute-force crack (maximum 1000 characters).
 * @returns An array of 25 objects with `shift` and decrypted `text`.
 */
export const bruteForce: (str: string) => CrackResult[];

/**
 * Encrypt a Buffer using the Caesar Cipher.
 *
 * @param buffer The Buffer to encrypt (maximum 1000 bytes).
 * @param key Shift key as an integer between 0 and 25.
 * @returns The encrypted Buffer.
 * @throws {Error} If `buffer` is empty/invalid, exceeds 1000 bytes, or `key` is not an integer in 0-25.
 */
export function encrypt(buffer: Buffer, key: number): Buffer;

/**
 * Decrypt a Buffer using the Caesar Cipher.
 *
 * @param buffer The Buffer to decrypt (maximum 1000 bytes).
 * @param key Shift key as an integer between 0 and 25.
 * @returns The decrypted Buffer.
 * @throws {Error} If `buffer` is empty/invalid, exceeds 1000 bytes, or `key` is not an integer in 0-25.
 */
export function decrypt(buffer: Buffer, key: number): Buffer;

/**
 * Transform stream for encrypting streams using Caesar Cipher.
 */
export class EncryptTransform extends Transform {
  /**
   * @param key Encryption key (integer between 0 and 25).
   */
  constructor(key: number);
}

/**
 * Transform stream for decrypting streams using Caesar Cipher.
 */
export class DecryptTransform extends Transform {
  /**
   * @param key Decryption key (integer between 0 and 25).
   */
  constructor(key: number);
}
