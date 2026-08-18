const {
  encrypt,
  decrypt,
  encryptString,
  decryptString,
  EncryptTransform,
  DecryptTransform,
} = require("..");
const fs = require("fs");
const { readFile } = require("fs/promises");
const path = require("path");
const assert = require("assert");
const { pipeline } = require("stream/promises");
const { after, describe, it } = require("node:test");

const inputFile = path.join(__dirname, "./test.txt");
const outputFile = path.join(__dirname, "./output.txt");

describe("@gykh/caesar-cipher", function () {
  describe("encrypt and decrypt", function () {
    it("should shift lowercase letters with wraparound", function () {
      assert.strictEqual(encryptString("abc xyz", 3), "def abc");
      assert.strictEqual(decryptString("def abc", 3), "abc xyz");
    });

    it("should shift uppercase letters with wraparound", function () {
      assert.strictEqual(encryptString("ABC XYZ", 3), "DEF ABC");
      assert.strictEqual(decryptString("DEF ABC", 3), "ABC XYZ");
    });

    it("should preserve case and non-letter characters", function () {
      const input = "Hello, World! 123\nZz.";
      const encrypted = "Khoor, Zruog! 123\nCc.";

      assert.strictEqual(encryptString(input, 3), encrypted);
      assert.strictEqual(decryptString(encrypted, 3), input);
    });

    it("should leave content unchanged with key 0", function () {
      const input = "Abc XYZ! 123";
      const buffer = Buffer.from(input);

      assert.strictEqual(encryptString(input, 0), input);
      assert.strictEqual(decryptString(input, 0), input);
      assert.deepEqual(encrypt(buffer, 0), buffer);
      assert.deepEqual(decrypt(buffer, 0), buffer);
    });

    it("should shift only ASCII letter bytes in buffers", function () {
      const encrypted = encrypt(Buffer.from("abc XYZ! 123\n"), 3);

      assert.strictEqual(encrypted.toString(), "def ABC! 123\n");
      assert.strictEqual(decrypt(encrypted, 3).toString(), "abc XYZ! 123\n");
    });

    it("should encrypt and decrypt file contents", async function () {
      const data = await readFile(inputFile);
      const encrypted = encrypt(data, 3);

      const decrypted = decrypt(encrypted, 3);

      assert.deepEqual(data, decrypted);
    });
    it("should encrypt and decrypt string contents", async function () {
      const data = await readFile(inputFile);
      const dataString = data.toString();

      const encrypted = encryptString(dataString, 3);

      const decrypted = decryptString(encrypted, 3);

      assert.deepEqual(dataString, decrypted);
    });
    it("should encrypt and decrypt streams", async function () {
      await pipeline(
        fs.createReadStream(inputFile),
        new EncryptTransform(3),
        new DecryptTransform(3),
        fs.createWriteStream(outputFile)
      );

      assert.deepEqual(fs.readFileSync(inputFile), fs.readFileSync(outputFile));
    });

    it("should correctly perform ROT13 encoding and decoding", function () {
      const { rot13 } = require("..");
      const text = "Hello, World! 123";
      const encoded = rot13(text);
      assert.strictEqual(encoded, "Uryyb, Jbeyq! 123");
      assert.strictEqual(rot13(encoded), text);
    });

    it("should crack ciphertext and find original plaintext", function () {
      const { crack, bruteForce, encryptString } = require("..");
      const original = "Attack at dawn!";
      const ciphertext = encryptString(original, 7);

      const permutations = crack(ciphertext);
      assert.strictEqual(permutations.length, 25);

      const match = permutations.find((p) => p.shift === 7);
      assert.ok(match);
      assert.strictEqual(match.text, original);

      const bfPermutations = bruteForce(ciphertext);
      assert.deepStrictEqual(bfPermutations, permutations);
    });

    it("should import cleanly from ESM module", async function () {
      const esm = await import("../index.mjs");
      assert.strictEqual(typeof esm.encryptString, "function");
      assert.strictEqual(typeof esm.decryptString, "function");
      assert.strictEqual(typeof esm.rot13, "function");
      assert.strictEqual(typeof esm.crack, "function");
      assert.strictEqual(typeof esm.bruteForce, "function");
      assert.strictEqual(typeof esm.encrypt, "function");
      assert.strictEqual(typeof esm.decrypt, "function");
      assert.strictEqual(typeof esm.EncryptTransform, "function");
      assert.strictEqual(typeof esm.DecryptTransform, "function");

      assert.strictEqual(esm.encryptString("abc", 1), "bcd");
    });


    after(() => {
      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
      }
    });
  });
});
