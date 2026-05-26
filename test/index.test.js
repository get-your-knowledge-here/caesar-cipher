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

    after(() => {
      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
      }
    });
  });
});
